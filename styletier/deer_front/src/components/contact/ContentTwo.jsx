import { Grid, makeStyles } from "@material-ui/core";

import contentBlackBgPng from "../../static/contentBlackBg.png";
import contentLogoPng from "../../static/contentLogo.png";

const useStyles = makeStyles((theme) => ({
  contentTwo: {
    // height: "620px",
    height: 200,
    display: "flex",
    position: "absolute",
    transform: "translate(0, -100%)",
    zIndex: 2,
    top: 900
  },
  contentTwoColumn: {
    // height: "600px",
      height: 200,
    "&:nth-child(1)": {
      position: "relative",
    },
    "&:nth-child(2)": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  contentBlackBg: {
    // width: "100%", 
    // height: "100%",
    width: 235,
    height: 102,
  },
  blackBgBox: {
    width: "100%",
    height: "100%",
    // marginLeft: "170px",
    // marginTop: "60px",
    marginLeft: 40,
    marginTop: 115,
    display: "flex",
    flexDirection: "column",
    transform: "translate(0, -100%)",
  },
  blackBgTitle: {
    left: 0,
    fontWeight: "600",
    // fontSize: "240px",
    fontSize: 45,
    fontFamily: 'AppleSB',
  },
  blackBgText: {
    fontWeight: "600",
    // fontSize: "30px",
    fontSize: 5,
    marginTop: 8,
    fontFamily: 'AppleUL',
  },
  contentTwoText: {
    // marginLeft: "200px",
    transform: "translate(0, -600px)",
    // fontSize: "20px",
    fontSize: 9,
    marginTop: 292,
    marginLeft: 14,
    overflow: "hidden",
    fontFamily: 'AppleSB',
  },
  contentTwoLogo: {
    height: "100%",
  },
}));

export const ContentTwo = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.contentTwo} container>
      <Grid className={classes.contentTwoColumn} item xs={7}>
        <img
          className={classes.contentBlackBg}
          src={contentBlackBgPng}
          alt=""
        ></img>

        <div className={classes.blackBgBox}>
          <span className={classes.blackBgTitle}>3초.</span>
          <span className={classes.blackBgText}>
            스타일티어의 CI가 만들어진 시간
          </span>
        </div>
        <div className={classes.contentTwoText}>
          {/* 멘트추가 */}
          <br />
          {/* 멘트추가 */}
          <br />
          {/* 멘트추가 */}
          </div>
      </Grid>
      <Grid className={classes.contentTwoColumn} item xs={5}>
        <img
          className={classes.contentTwoLogo}
          src={contentLogoPng}
          alt=""
        ></img>
      </Grid>
    </Grid>
  );
};

export default ContentTwo;
