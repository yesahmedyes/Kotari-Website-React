import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardMedia} from "@material-ui/core"
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight:275,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
    margin:"2%",
    backgroundImage: "linear-gradient(to right, #FFA9AC,#FFCFCF)",
    borderRadius: "25px",
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
  sub:{
    minWidth: 20,
    minHeight:150,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
    margin:"2%",
      backgroundColor: "#FFE6E8",
      borderRadius: "25px"
  }
});

export default function CategoryCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <div style={{display:"flex"}} >
        <Card className={classes.root} style={{flex:"6",display:"flex", justifyContent:"center",
          alignItems:"center"}}>

            <h2 >Groceries</h2>
            <img style={{width:"20%",marginLeft:"5%"}}src="http://shandistributionnetwork.com/wp-content/uploads/2019/02/junk-food-png-transparent-images-png-all-15.png"/>

          </Card>
          <Card className={classes.root} style={{flex:"6",display:"flex", justifyContent:"center",
            alignItems:"center"}}>

              <h2 >Groceries</h2>
              <img style={{width:"20%",marginLeft:"5%"}}src="http://shandistributionnetwork.com/wp-content/uploads/2019/02/junk-food-png-transparent-images-png-all-15.png"/>

            </Card>
        </div>
        <div style={{display:"flex"}} >
          <Card className={classes.sub} style={{flex:"2",textAlign:"center"}}>
                <img style={{width:"50%",marginTop:"15%"}}src="http://shandistributionnetwork.com/wp-content/uploads/2019/02/junk-food-png-transparent-images-png-all-15.png"/>
                <p>Powdered Burger</p>
            </Card>
            <Card className={classes.sub} style={{flex:"2",textAlign:"center"}}>
                  <img style={{width:"50%",marginTop:"15%"}}src="http://shandistributionnetwork.com/wp-content/uploads/2019/02/junk-food-png-transparent-images-png-all-15.png"/>
                  <p>Powdered Burger</p>
              </Card>
              <Card className={classes.sub} style={{flex:"2",textAlign:"center"}}>
                    <img style={{width:"50%",marginTop:"15%"}}src="http://shandistributionnetwork.com/wp-content/uploads/2019/02/junk-food-png-transparent-images-png-all-15.png"/>
                    <p>Powdered Burger</p>
                </Card>
                <Card className={classes.sub} style={{flex:"2",textAlign:"center"}}>
                      <img style={{width:"50%",marginTop:"15%"}}src="http://shandistributionnetwork.com/wp-content/uploads/2019/02/junk-food-png-transparent-images-png-all-15.png"/>
                      <p>Powdered Burger</p>
                  </Card>
                  <Card className={classes.sub} style={{flex:"2",textAlign:"center"}}>
                        <img style={{width:"50%",marginTop:"15%"}}src="http://shandistributionnetwork.com/wp-content/uploads/2019/02/junk-food-png-transparent-images-png-all-15.png"/>
                        <p>Powdered Burger</p>
                    </Card>
                    <Card className={classes.sub} style={{flex:"2",textAlign:"center"}}>
                          <img style={{width:"50%",marginTop:"15%"}}src="http://shandistributionnetwork.com/wp-content/uploads/2019/02/junk-food-png-transparent-images-png-all-15.png"/>
                          <p>Powdered Burger</p>
                      </Card>


          </div>
    </div>
  );
}
