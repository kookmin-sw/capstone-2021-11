import { Grid, makeStyles } from "@material-ui/core";

import facebookPng from "../../static/snsFacebook.png";
import instaPng from "../../static/snsInsta.png";
import youtubePng from "../../static/snsYoutube.png";

import snsBlueBgPng from "../../static/snsBlueBg.png";

const FACEBOOK_URL = "#";
const YOUTUBE_URL = "https://www.youtube.com/channel/UCLOCHFJRt67P2xD6UDRW2_w";
const INSTA_URL = "#";

const useStyles = makeStyles((theme) => ({
  // 하단 SNS Box
  snsBox: {
    width: "100%",
    // height: "400px",
    height: 110,
    // marginTop: "300px",
    // marginBottom: "300px",
    marginBottom: 22,
    position: "relative",
  },
  snsBoxBg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundImage: `url(${snsBlueBgPng})`,
    backgroundSize: "cover",
  },
  snsBoxTop: {
    // paddingTop: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: "30px",
    fontSize: 10,
    zIndex: 1,
    position: 'relative',
    bottom: 25,
    fontFamily: 'AppleSB',
  },
  snsBoxBottomText: {
    // paddingTop: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: "30px",
    fontSize: 10,
    zIndex: 1,
    position: 'relative',
    bottom: 25,
    fontFamily: 'AppleSB',
    marginTop: '3%',
  },
  snsBoxBottom: {
    padding: "0 12% 0px 12%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 1,
  },
  snsText: {},
  snsFacebook: {
    // width: "100px",
    width: 35,
  },
  snsYoutube: {
    // width: "100px",
    width: 40
  },
  snsInsta: {
    // width: "100px",
    width: 31,
  },
}));

export const ContentSNS = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.snsBox}>
      <Grid className={classes.snsBoxTop} item xs={12}>
        <span>I contact us right here bleow !</span>
      </Grid>
      <Grid className={classes.snsBoxBottom} item xs={12}>
        <a href={FACEBOOK_URL} target="blank">
          <img className={classes.snsFacebook} src={facebookPng} alt=""></img>
        </a>
        <a href={YOUTUBE_URL} target="blank">
          <img className={classes.snsYoutube} src={youtubePng} alt=""></img>
        </a>
        <a href={INSTA_URL} target="blank">
          <img className={classes.snsInsta} src={instaPng} alt=""></img>
        </a>
      </Grid>
      <div className={classes.snsBoxBg}></div>
      <Grid className={classes.snsBoxBottomText} item xs={12}>
        <span>다같이 산다 사슴맨션</span>
      </Grid>
    </Grid>
  );
};

export default ContentSNS;
