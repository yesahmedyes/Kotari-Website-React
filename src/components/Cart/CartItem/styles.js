import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  // media: {
  //   height: 260,
  // },
  // cardContent: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  // },
  // cartActions: {
  //   justifyContent: 'space-between',
  // },
  cartItem: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "18px 0"
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
  qBtn: {
    border: "0.25px solid #ccc",
    padding: "0",
    minWidth: "32px",
    color: "#555",
    fontSize: "18px",
    fontWeight: "400",
  },
  qBtnLeft: {
    borderRadius: "3px 0px 0px 3px",
  },
  qBtnRight: {
    borderRadius: "0px 3px 3px 0px",
  },
  qValue: {
    color: "#555",
    fontSize: "14px",
    padding: "5px 10px 5.4px 10px",
    borderTop: "0.25px solid #ccc",
    borderBottom: "0.25px solid #ccc",
  },
  deleteButton: {
    fontSize: "22px",
    color: "#bbb",
    textAlign: "center",
  },
}));
