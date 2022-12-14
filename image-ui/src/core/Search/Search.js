import React, { useState, useEffect } from "react";
import { getCategorys, getSearchedProducts } from "../apiCore";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Card from "../Card/Card";
import "./Search.css";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    result: [],
    searched: false,
  });

  const { categories, category, search, result, searched } = data;

  //get all categories
  const loadCategory = () => {
    getCategorys().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  //get searchData
  const searchData = () => {
    if (search) {
      getSearchedProducts({
        search: search || undefined,
        category: category,
      }).then((products) => {
        if (products.error) {
          console.log(products.error);
        } else {
          // console.log(products)
          setData({ ...data, result: products, searched: true });
        }
      });
    }
  };

  //form submit
  const searchSubmit = (e) => {
    e.preventDefault();

    searchData();
  };

  //input on chnage
  const handelChnage = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  //show search message
  const searchMessage = (searched, result) => {
    if (searched && result.length > 0) {
      return `Found ${result.length} Products! `;
    } else if (searched && result.length <= 0) {
      return "No Products Found!";
    }
  };

  // show the searched product
  const showSearchedProduct = (productData = []) => {
    return (
      <Container>
        <h3 className="mt-4 mb-4 ml-4 searchResult">{searchMessage(searched, result)}</h3>
        <Row>
          {productData.map((product, i) => (
            <Col md={4} className="mb-3">
              <Card key={i} product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  //search bar
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>

        <div className="search-wrapper cf">

        {/*
        <div className="input-group-prepend categoryText">
            <select className="btn mr-2" onChange={handelChnage("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
      */}

          <input
            type="search"
            className="form-control"
            onChange={handelChnage("search")}
            placeholder="Search Images"
          />

          <button type="submit" className="btn">Search</button>
        </div>



      </form>


    );
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <div>
      <div className="mt-5 mb-3">{searchForm()}</div>

      {showSearchedProduct(result)}
    </div>
  );
};

export default Search;
