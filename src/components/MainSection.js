import React from 'react'
import CONST from '../constants'

const MainSection = ({ mode, myData, curBlockHeight }) => {
    const diff = myData.BDay - curBlockHeight
    console.log(diff)
    const prefix = diff > 0 ? '-' : '+'
    return mode !== CONST.MODE['BDAY_SET']
      ? (
        <>
          <p className="logo lato-100">B<b>-</b>DAY</p>
          <p className="desc lato-100">How many blocks until your red-letter day?</p>
        </>
      )
      : (
        <>
          <p className="logo small">{CONST.LABEL[Number(myData.label)].label}<span className="lato-100"> 까지</span></p>
          <p className="bday lato-100">B{prefix}{Math.abs(diff)}</p>
          <em className="div">-</em>
        </>
      )
  }

export default MainSection
