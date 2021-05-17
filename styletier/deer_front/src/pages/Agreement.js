import React from "react";
import { makeStyles } from "@material-ui/core";

import { AgreementHtml } from "../components/contact/AgreementHtml"; // 이용약관

const Agreement = (props) => {
  const useStyles = makeStyles((theme) => ({
    page: {
      width: "100%",
      height: "100%",
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
      {/* 이용약관 HTML*/}
      <AgreementHtml />
    </div>
    </div>
  );
};

export default Agreement;
