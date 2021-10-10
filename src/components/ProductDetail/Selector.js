import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    fontSize: 14,
    color: "#333",
    padding: "6px 28px 6px 12px !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 5,
      borderColor: "#ccc",
      backgroundColor: "#fff",
      fontSize: 14,
      color: "#555",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: "15px",
    fontWeight: "400",
    color: "#666",
    margin: "0",
    padding: "0 14px 0 12px",
  },
  formControl: {},
  icon: {
    position: "absolute",
    right: "6px",
    fontSize: "18px",
    color: "#777",
    cursor: "pointer",
  },
}));

export default function Selector({ name, variations, handleVariation }) {
  const classes = useStyles();

  const [state, setState] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleDrop = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "12px 5px 2px 5px",
      }}
    >
      <p className={classes.name}>{name}</p>
      <FormControl className={classes.formControl}>
        <Select
          onChange={handleVariation}
          labelId="select size"
          open={open}
          onClick={handleDrop}
          inputProps={{
            name: name,
            id: "age-native-simple",
          }}
          input={<BootstrapInput />}
          IconComponent={() => (
            <KeyboardArrowDownIcon className={classes.icon} onClick={handleDrop} />
          )}
        >
          {variations[name].map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
