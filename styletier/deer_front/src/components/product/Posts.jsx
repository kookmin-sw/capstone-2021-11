/***** ./components/MoviesPage.jsx *****/

import Pagination from "./Pagination";
import { paginate } from "./paginate";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import product_api from "../../api/ProductAPI";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Button } from "@material-ui/core";

import _ from "lodash";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  product: {
    width: "50%",
    color: "white",
    marginBottom: "10%",
    "&:hover": {
      color: "white",
    },
  },
  prodName: {
    fontFamily: "AppleSB",
  },
  prodPic: {
    width: "100%",
    marginBottom: "6%",
  },
  categoryText: {
    marginTop: "0.5em",
    fontFamily: "AppleSB",
    color: "white",
    fontSize: ".9em",
    display: "inline",
  },
  categoryBtn: {
    marginRight: "30%",

    borderRadius: "10px",
    "&:focus": {
      outline: 0,
    },
  },
  categoryData: {
    marginLeft: "2%",
    marginTop: "3%",
    marginBottom: "3%",
    marginRight: "2%",
    alignItems: "center",
    textAlign: "center",
    boxSizing: "border-box",
  },
  prodLen: {
    fontFamily: "AppleSB",
    marginLeft: "3%",
  },
  bar: {
    backgroundColor: "white",
    padding: "0.1em",
    width: "100%",
    margin: "5% 2% 8% 2%",
  },
});

const Posts = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getProductList();
    categoryList();
  }, []);

  const getCategoryProduct = async (id) => {
    await product_api
      .getCategoryProduct(id)
      .then((result) => {
        console.log(result.data);
        setProducts(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handleOnClick = async (e) => {
    let id = e.currentTarget.getAttribute("value");
    const currntBtn = e.target.offsetParent;
    const superParnt = currntBtn.parentNode.parentNode.querySelectorAll("div");
    for (let i = 0; i < superParnt.length; i++) {
      superParnt[i].firstChild.style.backgroundColor = "";
    }
    currntBtn.style.backgroundColor = "#003b63";

    if (id === "1") {
      categoryList();
      getProductList();
    } else {
      getCategoryProduct(id);
    }
  };

  const categoryList = async () => {
    await product_api
      .getCategory()
      .then((result) => {
        console.log(result.data);
        //부모자식 데이터 처리
        let category = [];
        result.data.forEach((element) => {
          if (element.parent == null) {
            let child = [];
            for (let i = 0; i < result.data.length; ++i) {
              if (result.data[i].parent === element.id)
                child.push(result.data[i]);
            }
            element["child"] = child;
            category.push(element);
          }
        });
        console.log("category tree", category);

        setCategory(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getProductList = async () => {
    await product_api
      .getAllProduct()
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getProds = () => {
    const pdList = products.map((p) => ({
      id: p.id,
      name: p.name,
      img: p.photo[0].img,
      price: p.price,
    }));
    return pdList;
  };

  const [prods, setProds] = useState({
    data: getProds(),
    pageSize: 6, // 한 페이지에 보여줄 상품 개수
    currentPage: 1, // 현재 활성화된 페이지 위치
  });

  prods.data = getProds();
  const handlePageChange = (page) => {
    setProds({ ...prods, currentPage: page });
  };

  const { data, pageSize, currentPage } = prods;
  const paginateProd = paginate(data, currentPage, pageSize);

  const prodLength = products.length;

  if (prodLength === 0)
    return (
      <>
        <Grid container spacing={1} className={classes.categoryData}>
          {category.map((category) => (
            <Grid>
              <Button className={classes.categoryBtn}>
                <Typography
                  id="click"
                  value={category.id}
                  onClick={handleOnClick}
                  className={classes.categoryText}
                >
                  {category.name}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
        <div className={classes.bar}></div>
        <p className={classes.prodLen}>상품 정보가 없습니다.</p>
      </>
    );

  return (
    <>
      <Grid container spacing={1} className={classes.categoryData}>
        {category.map((category) => (
          <Grid>
            <Button className={classes.categoryBtn}>
              <Typography
                id="click"
                value={category.id}
                onClick={handleOnClick}
                className={classes.categoryText}
              >
                {`${category.name}`}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
      <div className={classes.bar}></div>
      <p className={classes.prodLen}>{prodLength} 개의 상품이 있습니다.</p>
      <div>
        {paginateProd.map((p) => (
          <Button
            component={Link}
            to={`/shop/${p.id}`}
            className={classes.product}
            onClick={() => window.scrollTo(0, 0)}
          >
            <div>
              <Typography className={classes.prodName}>
                <img src={p.img} className={classes.prodPic} />
                <br />
                {p.name} <br />
                {p.price}w
              </Typography>
            </div>
          </Button>
        ))}
      </div>

      <Pagination
        pageSize={pageSize}
        itemsCount={prodLength}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Posts;
