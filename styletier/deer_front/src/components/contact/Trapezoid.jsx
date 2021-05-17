import { makeStyles } from "@material-ui/core";

import kingPng from "../../static/king.png";

const useStyles = makeStyles((theme) => ({
  trapezoid: {
    width: "100%",
    // height: "1800px",
    position: "relative",
    transform: "translate(0, -40%)",
    zIndex: 1,
    // overflow: "hidden",
  },
  trapezoidTop: {
    // top: 0,
    top: -834,
    width: 600,
    height: 250,
    background: "black",
    position: "absolute",
    // transform: "translate(-10%,62%) rotate(-7deg)",
    transform: "translate(-10%,62%) rotate(-17deg)",
    opacity: 1,
  },
  trapezoidBottom: {
    bottom: 220,
    width: 600,
    height: 250,
    background: "black",
    position: "absolute",
    transform: "translate(-10%, -35%) rotate(10deg)",
    opacity: 1,
    overflow: "hidden",
  },
  kingOne: {
    width: "240px",
    position: "absolute",
    transform: "translate(140%, 210%) rotate(-20deg)",
    opacity: 0.6,
  },
  kingTwo: {
    width: "140px",
    position: "absolute",
    transform: "translate(165%, 305%) rotate(27deg)",
    opacity: 0.3,
  },
  kingThree: {
    width: "80px",
    position: "absolute",
    transform: "translate(255%, 450%) rotate(-40deg)",
    opacity: 0.2,
  },
}));

export const Trapezoid = () => {
  const classes = useStyles();
  return (
    <div className={classes.trapezoid}>
      <div className={classes.trapezoidTop}></div>
      <div className={classes.trapezoidBottom}></div>
      <img id="ha" className={classes.kingOne} src={kingPng} alt=""></img>
      <img className={classes.kingTwo} src={kingPng} alt=""></img>
      <img className={classes.kingThree} src={kingPng} alt=""></img>
    </div>
  );
};

export default Trapezoid;
