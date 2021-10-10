import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardMedia} from "@material-ui/core"
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NL from "../../assets/NL.png";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight:275,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:"2%",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1)",
      borderRadius: "15px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '70.25%', // 16:9
  },
  container:{
    display:"flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center"
  }
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (

    <Card className={classes.root}>

      <div className={classes.container}>
        <img src={NL} style={{width:"50%"}}/>
          <p>Evaly Zays Official Store</p>

      </div>

    </Card>
  );
}
