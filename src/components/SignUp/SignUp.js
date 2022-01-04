import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import { withRouter } from "react-router-dom";
import { firebase,db } from "../../firebase";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Kotari
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  phone: {
    width: "400px",
  },
}));

const phoneNumber = (inputtxt) => {
  var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{7})$/;
  //  inputtxt=inputtxt.replace(/\s/g, "");
  inputtxt = inputtxt.replace("-", "");
  console.log(inputtxt);
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    console.log("Sdsd");
    return false;
  }
};

const SignUp = (props) => {
  const [showConfirm, setConfirm] = React.useState(false);
  const [phoneNum, setPhoneNum] = React.useState(null);
  const [validPhone, setValidPhone] = React.useState(false);
  const [validCode, setValidCode] = React.useState(false);
  const [confirmationCode, setCode] = React.useState(null);
  const [e, setE] = React.useState(null);
  const classes = useStyles();
  const handlePhoneNumber = (phone) => {
    setPhoneNum(phone);
    if (phoneNumber(phone)) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }
  };
  console.log("PROPS",props);
  const RecaptchaVerifier = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          handleFirebase();
        },
      }
    );
  };
  const intermediate = () => {
    var code = confirmationCode;

    console.log(code);
    if (code === null) return;

    var credentials = firebase.auth.PhoneAuthProvider.credential(
      e.verificationId,
      code
    );
    firebase.auth().currentUser
      .linkWithCredential(credentials)
      .then((usercred) => {
        var user = usercred.user;
        console.log("Anonymous account successfully upgraded", user);
      })
      .catch((error) => {
        console.log("Error upgrading anonymous account", error);
      });
    e.confirm(code)
      .then(function (result) {
        console.log("RESULT",props.docId);
          db.collection("cart")
          .doc(props.docId)
          .collection("products")
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());

            data.forEach((product)=>{
              console.log(product,result.user.uid);
              let temp = [];
              let tempString="";
              for (let key of Object.entries(product.variations)) {
                tempString="";
                tempString+=key[0];
                tempString+="[";
                tempString+=key[1];
                tempString+="]";
                temp.push(tempString);
              }
              let compare = temp.sort();
              let answer="";
              for(let x=0;x<compare.length;x++){
                answer+=compare[x];
                if(x!==(compare.length-1)){
                  answer+="-";
                }
              }
              console.log("RESULT USER",result.user.uid);
              console.log("PROPS",props.docId);
                db.collection("cart").where("consumerId","==",result.user.uid).where("completed","==","false").get().then((querySnapshot)=>{
                  let data;
                  querySnapshot.forEach((doc) => {
                    data=doc.id;
                  });
                  console.log(data);
                  console.log(product.product+"-"+answer);
                  db.collection("cart").doc(data).collection("products").doc(product.product+"-"+answer).set({
                  product:product.product,
                  quantity:product.quantity,
                  variations:product.variations
                }).then(()=>{
                  console.log("SETTT");
                })
            });



          });
        });
        props.history.push("/");
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const handleFirebase = () => {
    RecaptchaVerifier();
    var recaptcha = window.recaptchaVerifier;
    var number = phoneNum;
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (e) {
        setE(e);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const handleConfirmation = () => {
    setConfirm(true);
    handleFirebase();
  };

  console.log(confirmationCode);

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "180px" }}>
      <div className={classes.paper}>
        {/* <img style={{ width: "50%" }} src={logo} /> */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate autocomplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <MuiPhoneNumber
                defaultCountry={"pk"}
                className={classes.phone}
                autoFocus
                onChange={(e) => {
                  handlePhoneNumber(e);
                }}
                value={phoneNum}
              />
              ,
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <div id="recaptcha"></div>
              {validPhone ? (
                <Button
                  size="large"
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleConfirmation}
                >
                  Send Confirmation
                </Button>
              ) : (
                <Button
                  size="large"
                  type="button"
                  variant="contained"
                  color="secondary"
                  disabled
                >
                  Send Confirmation
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              {showConfirm ? (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirmation code"
                  onChange={(e) => {
                    if (e.target.value.length === 6) {
                      setValidCode(true);
                    } else {
                      setValidCode(false);
                    }
                    setCode(e.target.value);
                  }}
                  autoComplete="off"
                  type="text"
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Send me updates"
              />
            </Grid>
          </Grid>
          {validCode ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={intermediate}
              className={classes.submit}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              disabled
              fullWidth
              variant="contained"
              color="primary"
              onClick={intermediate}
              className={classes.submit}
            >
              Sign Up
            </Button>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch({ type: "GETUSER" }),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(SignUp));
