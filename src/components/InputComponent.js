import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/styles';
import CONST from '../constants'

const MyTextField = styled(TextField)({
  marginLeft: 8,
  marginRight: 8,
});

export default class InputComponent extends Component {
  render() {
    const { inputData, setInputData, curBlockHeight } = this.props

    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        <MyTextField
          select
          label="B-Day"
          placeholder=""
          value={inputData.label}
          onChange={setInputData('label')}
          SelectProps={{
            native: true,
            MenuProps: {
              style: {
                width: 200
              },
            },
          }}
          helperText="어떤 날인가요?"
          margin="normal"
          variant="outlined"
        >
          {CONST.LABEL.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </MyTextField>
        <MyTextField
          label="Block Height"
          placeholder={curBlockHeight}
          value={inputData.BDay}
          onChange={setInputData('BDay')}
          helperText="블록 값을 입력해주세요."
          margin="normal"
          variant="outlined"
        />
      </div>
    )
  }
}