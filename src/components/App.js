import React, { Component } from 'react'
import SDK from '../apis/SDK';
import { withSnackbar } from 'notistack';
import IconexConnect from '../apis/IconexConnect';
import CurrentBlockViewer from './CurrentBlockViewer';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import MainSection from './MainSection';
import CONST from '../constants';
import '../styles/animation.scss';
import config from '../config';

class App extends Component {
  constructor(props) {
    super(props)
    this.blockTimer = null
    this.state = {
      mode: CONST.MODE['LOG_OUT'],
      myAddress: '',
      myData: { label: '', BDay: '' },
      inputData: { label: '00', BDay: '0' },
      curBlockHeight: 0,
    }
  }

  async componentDidMount() {
    /* 블록 2초 간격 조회 */
    this.blockTimer = setInterval(async () => {
      const { height: curBlockHeight } = await SDK.iconService.getLastBlock().execute();
      this.setState({
        curBlockHeight
      })
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.blockTimer)
  }

  setInputData = name => event => {
    this.setState({
      inputData: {
        ...this.state.inputData,
        [name]: event.target.value
      }
    })
  };

  buttonClick = () => {
    const { mode } = this.state
    switch(mode) {
      case CONST.MODE['LOG_OUT']: 
        this.getAddress()
        break
      case CONST.MODE['LOG_IN']:
      case CONST.MODE['BDAY_SET']: 
        this.sendTransaction()
        break
      default:
        break;
    }
  }

  getAddress = async () => {
    const { iconService, callBuild } = SDK
    const { enqueueSnackbar } = this.props
    const myAddress = await IconexConnect.getAddress()
    const myData = await iconService.call(
      callBuild({
        from: myAddress,
        methodName: 'getBDay',
        params: {},
        to: window.CONTRACT_ADDRESS,
      })
    ).execute()

    this.setState({
      mode: !!myData ? CONST.MODE['BDAY_SET'] : CONST.MODE['LOG_IN'],
      myAddress,
      myData: !!myData ? { label: myData.slice(0, 2), BDay: myData.slice(2) } : {}
    })

    enqueueSnackbar(`Hello, ${myAddress}.`, { 
      variant: 'success' 
    })
  }

  sendTransaction = async () => {
    const { iconService, sendTxBuild } = SDK
    const { inputData, myAddress } = this.state
    const { enqueueSnackbar } = this.props
    try {
      const { label, BDay } = inputData
      const txObj = sendTxBuild({
        from: myAddress,
        to: window.CONTRACT_ADDRESS,
        methodName: 'setBDay',
        params: {
          _lable_height: `${label}${BDay}`
        },
      })
      const tx = await IconexConnect.sendTransaction(txObj)
      console.log(tx)
  
      this.setState({
        mode: CONST.MODE['BDAY_SET'],
        myData: { label, BDay } 
      })
  
      enqueueSnackbar(`Congratulations, Your B-Day is set!`, { 
        variant: 'success' 
      })

    } catch (e) {
      enqueueSnackbar(`Failed for some reason!`, { 
        variant: 'error' 
      })
    }
    
  }


  render() {
    console.log(this.state.inputData)
    const { mode } = this.state
    return (
      <div className="App">
        <section className="main">
          <CurrentBlockViewer {...this.state} />
          <MainSection {...this.state} />
          <div style={{ minHeight: 100 }}>
            { mode !== CONST.MODE['LOG_OUT'] && (<InputComponent {...this.state} setInputData={this.setInputData} />)}
          </div> 
          <ButtonComponent {...this.state} buttonClick={this.buttonClick} />
        </section>
      </div>
    )
  }
}

export default withSnackbar(App)