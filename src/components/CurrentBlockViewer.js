import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link'; 
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { styled } from '@material-ui/styles';

const MyPaper = styled(Paper)({
  padding: '0 16px 0 16px',
  textAlign: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  position: 'fixed',
  top: -8,
  background: 'rgba(243, 243, 243, 0.93)',
});

const MyBreadcrumbs = styled(Breadcrumbs)({
  margin: 8,
  fontSize: 28,
  marginTop: -8,
  marginBottom: 3,
});

const labelStyle = {
  fontSize: 10,
  fontWeight: 500,
  color: '#555'
}

export default class CurrentBlockViewer extends Component {
  render() {
    const { curBlockHeight } = this.props
    const blockHeightView = curBlockHeight || '··········'
    return (
      <MyPaper elevation={0}>
        <label style={labelStyle}>Current Block</label>
        <MyBreadcrumbs className='lato-100' aria-label="Breadcrumb">
          <Link color="inherit" href="#">{blockHeightView}</Link>
        </MyBreadcrumbs>
      </MyPaper>
    )
  }
}
