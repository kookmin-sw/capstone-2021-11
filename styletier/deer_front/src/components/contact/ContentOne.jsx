import { makeStyles } from "@material-ui/core";
import youtubePng from "../../static/youtube.png";

const YOUTUBE_URL = "https://www.youtube.com/channel/UCLOCHFJRt67P2xD6UDRW2_w";

const useStyles = makeStyles((theme) => ({
  contentOne: {
    width: "100%",
    // height: "620px",
    height: 260,
    display: "flex",
    // justifyContent: "flex-end",
    position: "absolute",
    transform: "translate(0, -295%)",
    zIndex: "1",
    top: 1117
  },
  contentOneColumn: {
    left: 0,
    // width: "60%",
    // height: "100%",
    height: 300,
    marginLeft: "7%",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    position: "absolute",
    transform: "translate(0, 20px)",
    zIndex: -1,
  },
  oneColumnChild_title: {
    // marginTop: "100px",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    marginLeft: 158,
    position: "relative",
    bottom: 211
  },
  oneColumnChild_box: {
    // marginTop: "100px",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    // marginLeft: 158
    marginLeft: 95,
    marginBottom: 74,
  },
  youtubePng: {
    width: "65px",
    height: "45px",
  },
  contentOneTitle: {
    // paddingRight: "55%",
    // fontSize: "50px",
    fontSize: "26px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'AppleSB',
  },
  contentOneBox: {
    width: "100%",
    // height: "180px",
    height: 40,
    border: "4px solid #22489E",
    // paddingLeft: "60px",
    paddingLeft: 121,
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-start",
    justifyContent: "end",
    // fontSize: "26px",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: 'AppleSB',
  },
  video: {
    right: 0,
    // marginRight: "2%",
    // width: "48.5%",
    // height: "100%",
    width: 350,
    height: 202,
    transform: "translate(0, -5%)",
  },
  videoBg: {
    right: 0,
    width: "48.5%",
    height: "100%",
    position: "absolute",
    background: "rgba(35, 75, 166, 0.35)",
    zIndex: -2,
    transform: "translate(-15%, -10%)",
  },
  videoTag: {
    // bottom: 0,
    top: 158,
    marginRight: "2%",
    position: "absolute",
    transform: "translate(0, 400%)",
    // fontSize: "20px",
    fontSize: 10,
    fontFamily: 'AppleSB',
  },
}));

export const ContentOne = () => {
  const classes = useStyles();

  return (
    <div className={classes.contentOne}>
      <div className={classes.contentOneColumn}>
        <div className={classes.oneColumnChild_title}>
          <a href={YOUTUBE_URL} target="blank">
            <img className={classes.youtubePng} src={youtubePng} alt=""></img>
          </a>
          <span className={classes.contentOneTitle}>사슴맨션</span>
        </div>
        <div className={classes.oneColumnChild_box}>
          <div className={classes.contentOneBox}>
            남자 4명이 사는 맨션에서 벌어지는 <br /> 우당탕탕 좌충우돌 스토리
          </div>
        </div>
      </div>
      <iframe
        title="This is Deer introduction video."
        className={classes.video}
        id="ytplayer"
        type="text/html"
        width="1920"
        height="1080"
        src="https://www.youtube.com/embed/oZ8PnFBZVY4"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      {/* <div className={classes.videoBg}></div> */}
      <div className={classes.videoTag}>#사슴맨션 #스타일티어</div>
    </div>
  );
};

export default ContentOne;
