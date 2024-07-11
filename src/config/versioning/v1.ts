import express from "express";

const api = express.Router();
import users from "../../users/routes/user";
import blacklist from '../../users/routes/blacklist'
 
api.get("/", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "Welcome to My App API",
  })
);

api.use("/users", users);
api.use("/blacklist", blacklist )
export default api;
