import express from "express";

const api = express.Router();
import users from "../../modules/users/routes/user";
import blacklist from "../../modules/users/routes/blacklist";
import admins from "../../modules/admins/routes/admin"
import categories from "../../modules/categories/routes/category"
import products from "../../modules/products/routes/products"

api.get("/", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "Welcome to My App API",
  })
);

api.use("/users", users);
api.use("/blacklist", blacklist);
api.use("/admin", admins);
api.use("/category",categories)
api.use("/product",products)
export default api;
