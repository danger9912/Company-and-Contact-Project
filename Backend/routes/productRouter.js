const express = require("express");
const Product = require("../models/productModels");

const router = express.Router();
const prodController = require("../controller/productController");


router.post("/createProduct",prodController.createProduct);
router.post("/getproduct", prodController.getAllProducts);


router.post("/getProductById", prodController.getProductById)

router.post("/updateProduct", prodController.updateProduct);
router.post("/deleteProduct", prodController.deleteProduct);





module.exports = router