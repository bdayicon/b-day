import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CONST from '../constants'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  input: {
    display: 'none',
  },
}));

function ButtonComponent({ mode, buttonClick }) {
  const classes = useStyles();
  let label = '', variant = 'outlined'
  switch(mode) {
    case CONST.MODE['LOG_OUT']: 
      label = 'ICONex 연동하기'
      break
    case CONST.MODE['LOG_IN']:
      variant = 'contained'
      label = 'B-Day 설정하기'
      break
    case CONST.MODE['BDAY_SET']: 
      label = 'B-day 재설정하기'
      break
    default:
      break;
  }
  return <Button onClick={buttonClick} variant={variant} color="primary" className={classes.button}>{label}</Button>
}

export default ButtonComponent;
