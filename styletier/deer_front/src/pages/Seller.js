import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SellerView from "../components/seller/SellerView";
import user_api from "../api/UserAPI";
import "../index.css";

import photo_api from "../api/PhotoAPI";

// img import
import paper from "../static/paper.jpg";

const useStyles = makeStyles((theme) => ({
  mob: {
    position: "relative",
    minWidth: "320px",
    maxWidth: "480px",
    width: "100%",
    margin: "auto",
    backgroundImage: `url(${paper})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingTop: "10em",
    paddingBottom: "10em",
  },
  title: {
    color: "#014D81",
    position: "absolute",
    marginLeft: "5%",
    top: 20,
    fontSize: 60,
    fontFamily: "AppleSB",
    fontWeight: "bold",
  },
}));

function Seller() {
  const classes = useStyles();
  const [sellers, setSellers] = useState([]);
  const [deerphoto, setDeerPhoto] = useState([]);
  useEffect(() => {
    getSellerList();
    getDeerPhotoList();
  }, []);

  const getSellerList = async () => {
    await user_api
      .getDeers()
      .then((result) => {
        console.log(result.data);
        setSellers(result.data);
      })
      .catch((err) => console.log(err));
  };
  const getDeerPhotoList = async () => {
    await photo_api
      .getDeerPhoto()
      .then((result) => {
        console.log(result.data);
        setDeerPhoto(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.mob}>
      <Container maxWidth="lg">
        <p className={classes.title}>SELLER</p>
        {sellers.map((seller, idx) => (
          <SellerView key={seller.id} index={idx} sellerInfo={seller} />
        ))}
      </Container>
    </div>
  );
}

export default Seller;
