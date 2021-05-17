import React from "react";
import { makeStyles } from "@material-ui/core";

import davidPng from "../../static/david.png";

const useStyles = makeStyles((theme) => ({
  header: {
    margin: "0 auto",
    // width: "80vw",
    // height: "1000px",
    height: 936,
    position: "relative",
    fontFamily: 'AppleUL',
  },
  headerTitle: {
    // marginTop: "200px",
    // position: "absolute",
    position: "relative",
    transform: "translate(-80px,0)",
    fontWeight: "600",
    // fontSize: "77px",
    fontSize: "28px",
    bottom: 165,
    left: 25,
    fontFamily: 'AppleSB',
  },
  headerText: {
    // bottom: 0,
    width: "44.5%",
    position: "absolute",
    transform: "translate(-80px,-340px)",
    // fontSize: "18px",
    bottom: 378,
    left: 87,
    fontSize: 9,
    fontFamily: 'AppleUL',
    overflow: "hidden",
  },
  david: {
    // right: 0,
    // height: "750px",
    bottom: 27,
    left: 175,
    height: 250,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    opacity: 0.8,
    // position: "absolute",
    position: "relative",
    transform: "translate(-15.5%,6.5%)",
    zIndex: "1",
  },
  headerBox: {
    // right: 0,
    // width: "700px",
    width: 245,
    // height: "230px",
    height: 68,
    // border: "4px solid #22489E",
    border: "6px solid #22489E",
    // paddingLeft: "20px",
    paddingLeft: "1px",
    display: "flex",
    alignItems: "center",
    transform: "translate(-35%,90%)",
    position: "absolute",
    // fontSize: "27px",
    fontSize: "10px",
    fontWeight: "bold",
    right: -80,
    top: -15
  },
  blueLine: {
    // right: 0,
    // width: "400px",
    // height: "230px",
    borderRight: "6px solid #2354C5",
    borderBottom: "6px solid #22489E",
    transform: "translate(-63.1%,93.2%)",
    position: "absolute",
    zIndex: "2",
    right: -149,
    top: -7,
    width: 245,
    height: 68,
  },
}));

export const ContactHeader = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <span className={classes.headerTitle}>스타일티어</span>
      <div className={classes.headerText}>
        {/* 멘트추가 */}
        <br />
        {/* 멘트추가 */}
        <br />
        {/* 멘트추가 */}
        </div>
      <img className={classes.david} src={davidPng} alt=""></img>
      <div className={classes.headerBox}>
        당신의 패션을
        <br />
        완성시키는 우리들
      </div>
      <div className={classes.blueLine}></div>
    </header>
  );
};
