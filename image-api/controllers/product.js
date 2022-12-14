const Product = require("../models/Product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const User = require("../models/userDetails.js");
const { exec } = require("child_process");

//get product by id
exports.productByID = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not Found !",
        });
      }

      req.product = product;
      next();
    });
};

//get product
exports.read = (req, res, next) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//create product
exports.create = (req, res, next) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log('imagfe',err);
      return res.status(400).json({
        error: "Image Upload Error",
        
      });
    }

    const { name, description, extra_small_price, small_price, medium_price, large_price, category, quantity, shipping, owner } = fields;
    if (
      !name ||
      !description ||
      !extra_small_price ||
      !small_price ||
      !medium_price ||
      !large_price ||
      !category ||
      !quantity ||
      !shipping ||
      !owner

    ) {
      return res.status(400).json({
        error: "All Fields are Required",
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image Should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json({
        result,
      });
    });
  });
};

//remove product
exports.remove = (req, res, next) => {
  let product = req.product;
  product.remove((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    return res.json({
      message: "Prodcut deleted Successfully",
    });
  });
};

//update product
exports.update = (req, res, next) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image Upload Error",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    //console.log(files.photo);
    if (files.photo.size > 0) {
      // console.log("oohot")
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image Should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json({
        result,
      });
    });
  });
};

//sell // arrival

//get all product
exports.getAll = (req, res, next) => {
  //filter field data

  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  //let limit = req.query.limit ? parseInt(req.query.limit) : 4;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    // .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not Found",
        });
      }
      //  console.log(products);
      return res.send(products);
    });
};

/// get related product
exports.listRelated = (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not Found",
        });
      }
      return res.send(products);
    });
};

//get all category
exports.allCategory = (req, res, next) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Categorys not Found",
      });
    }

    return res.json(category);
  });
};

// get search prodcut date
exports.searchData = (req, res, next) => {
  //filter field data
  let order = req.body.order ? req.body.order : "asc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not Found",
        });
      }

      return res.json({
        size: data.length,
        data,
      });
    });
};

//search product
exports.querySearchData = (req, res, next) => {
  const query = {};
  // console.log(req.query.category)
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    Product.find(query, (err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        return res.json(result);
      }
    }).select("-photo");
  }
};

//get product photo
exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
};

//decrease the quantity after an order
exports.decreaseQnt = (req, res, next) => {
  let bulkOption = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOption, {}, (err, data) => {
    if (err) {
      return res.json({
        error: "Can't update the product",
      });
    } else {
      next();
    }
  });
};

//add new bids
exports.addBids = (req, res, next) => {
  let product = req.product;

  // console.log(product);

  User.findById(req.params.userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found",
      });
    }

    let data = {
      bidPrice: req.body.bidPrice,
      userName: user.name,
      date: new Date(),
    };
    // product = _.extend(product, fields);
    //console.log(profile);
    product.bids.push(data);

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json({
        result,
      });
    });
  });
};


//get product of single user
exports.getProductByUserId = (req, res, next) => {
  //filter field data

  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find({
    owner: req.params.userId
  })
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    // .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not Found",
        });
      }
      //  console.log(products);
      return res.send(products);
    });
};

