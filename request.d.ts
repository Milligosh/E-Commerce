import { Request } from "express";
import Categories from "./src/modules/categories/services/categories.services";
import Products from "./src/modules/products/services/products.services";

declare module "express" {
  interface Request {
    categories?: Categories;
    products?: Products;
    passedFiles?: {
      filesOver2MB: File[];
      filesUnder2MB: File[];
    };
  }
}
