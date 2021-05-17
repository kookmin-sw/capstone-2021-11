import React from "react";
import { makeStyles } from "@material-ui/core";

import { ContactHeader } from "../components/contact/Header"; // 페이지 Title 및 David 조각상이 있는 Header
import { Trapezoid } from "../components/contact/Trapezoid"; // 사다리꼴 모양 검은 배경과 및 체스 말
import { ContentOne } from "../components/contact/ContentOne"; // 첫 번째 Content
import { ContentTwo } from "../components/contact/ContentTwo"; // 두 번째 Content
import { ContentSNS } from "../components/contact/ContentSNS"; // SNS Content

// External Link
const BG_IMG_URL =
  "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F25719933514DCA941A";

const Contact = (props) => {
  const useStyles = makeStyles((theme) => ({
    page: {
      width: "100%",
      height: "100%",
      backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.8)), url(${BG_IMG_URL})`,
      backgroundSize: "cover",
      overflow: "hidden",
    },
    mob:{
      position: 'relative',
      minWidth: '320px',
      maxWidth: '480px',
      width: '100%',
      margin: 'auto',
    },
  }));

  const classes = useStyles();

  return (
    <div id="ha" className={classes.mob} >
    <div id="ha" className={classes.page}>
      {/* Header Content*/}
      <ContactHeader />

      {/* Bcakground Trapezoid */}
      <Trapezoid />

      {/* Video Content */}
      <ContentOne />

      {/* Description Content */}
      <ContentTwo />

      {/* SNS Content */}
      <ContentSNS />
    </div>
    </div>
  );
};

export default Contact;
