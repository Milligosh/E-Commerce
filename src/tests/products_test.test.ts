import { expect } from "chai";
import sinon, { SinonStub } from 'sinon';
import request from "supertest";
import app from "../index";
import { StatusCodes } from "../helper/statusCodes";
import { ProductServices } from "../modules/products/services/products";
import * as auth from "../middlewares/authorization";
import { ApiConstants } from "../helper/constants";
import jwt from 'jsonwebtoken';
import pool from "../config/database/db";
import { GenericHelper } from "../helper/generator";
import { Userservice } from "../modules/users/services/user.services";

const baseUrl = '/api/v1/product';

describe('Products API', () => {
    
  let createProductStub: SinonStub;
  let authStub: SinonStub;
  let isAdminStub: SinonStub;
  let fetchProductsStub: SinonStub;
  let queryStub: SinonStub;
  
  
  

  beforeEach(() => {
    createProductStub = sinon.stub(ProductServices, "createProduct");
    authStub = sinon.stub(auth, "default").callsFake((req, res, next) => next());
    isAdminStub = sinon.stub(auth, "isAdmin").callsFake((req, res, next) => {next();
        return undefined; });
        fetchProductsStub = sinon.stub(Userservice, "fetchProducts");
    queryStub = sinon.stub(pool, "query");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Product Tests', () => {
    it('should create a new product when valid data is provided', async () => {
      const newProduct = {
        name: "Test Product",
        description: "This is a test product",
        price: 9999,
        stock: 100,
        image: "test-image-url.jpg"
      };
      const categoryId = "test-category-id";

      const expectedResponse = {
        message: ApiConstants.PRODUCT_CREATED,
        code: StatusCodes.CREATED,
        data: { id: "prod123", ...newProduct, category_id: categoryId }
      };

      createProductStub.resolves(expectedResponse);

      const response = await request(app)
        .post(`${baseUrl}/${categoryId}/create-product/`)
        .send(newProduct)
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmNDRiNTc4NTgxMTRmMGNhOTg3ZTA2ZmM4NDI1ZjM0IiwiZnVsbG5hbWUiOiJNaWxsaSBDZW50IiwidXNlcm5hbWUiOiJtaWxsaSIsImVtYWlsIjoiYWRqdWJlbG1pbGxpY2VudEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkYXQiOiIyMDI0LTA5LTAxVDIyOjE0OjAwLjg1MVoiLCJpYXQiOjE3MjUzNjYwNzJ9.jy28tkClLnVs6p_ohOelhmTnIJ6jiu520wQ5Qrz8fNo');

      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.deep.equal(expectedResponse);
      expect(createProductStub.calledOnce).to.be.true;
      expect(createProductStub.firstCall.args[0]).to.deep.equal({
        ...newProduct,
        category_id: categoryId
      });
    });

    it('should return an error when product creation fails', async () => {
      const newProduct = {
        name: "Test Product",
        description: "This is a test product",
        price: 9999,
        stock: 100,
        image: "test-image-url.jpg"
      };
      const categoryId = "test-category-id";

      const expectedError = {
        message: ApiConstants.CATEGORY_NOT_FOUND,
        code: StatusCodes.NOT_FOUND,
        data: null
      };

      createProductStub.resolves(expectedError);

      const response = await request(app)
        .post(`${baseUrl}/${categoryId}/create-product/`)
        .send(newProduct)
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmNDRiNTc4NTgxMTRmMGNhOTg3ZTA2ZmM4NDI1ZjM0IiwiZnVsbG5hbWUiOiJNaWxsaSBDZW50IiwidXNlcm5hbWUiOiJtaWxsaSIsImVtYWlsIjoiYWRqdWJlbG1pbGxpY2VudEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkYXQiOiIyMDI0LTA5LTAxVDIyOjE0OjAwLjg1MVoiLCJpYXQiOjE3MjUzNjYwNzJ9.jy28tkClLnVs6p_ohOelhmTnIJ6jiu520wQ5Qrz8fNo');

      expect(response.status).to.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.deep.equal(expectedError);
      expect(createProductStub.calledOnce).to.be.true;
    });

    // it('should return an error when required fields are missing', async () => {
    //   const incompleteProduct = {
    //     name: "Test Product",
        
    //   };
    //   const categoryId = "test-category-id";

    //   const response = await request(app)
    //     .post(`${baseUrl}/${categoryId}/create-product/`)
    //     .send(incompleteProduct)
    //     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmNDRiNTc4NTgxMTRmMGNhOTg3ZTA2ZmM4NDI1ZjM0IiwiZnVsbG5hbWUiOiJNaWxsaSBDZW50IiwidXNlcm5hbWUiOiJtaWxsaSIsImVtYWlsIjoiYWRqdWJlbG1pbGxpY2VudEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkYXQiOiIyMDI0LTA5LTAxVDIyOjE0OjAwLjg1MVoiLCJpYXQiOjE3MjUzNjYwNzJ9.jy28tkClLnVs6p_ohOelhmTnIJ6jiu520wQ5Qrz8fNo');

    //   expect(response.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    //   expect(response.body).to.have.property('message').that.includes('required');
    //   expect(createProductStub.called).to.be.false;
    // });
  });
  it("should fetch products with no filters", async function() {
    const mockProducts = [
      { id: "1", name: "Product 1", price: 100, category_id: "cat1", rating: 4.5 },
      { id: "2", name: "Product 2", price: 200, category_id: "cat2", rating: 3.5 }
    ];

    fetchProductsStub.resolves({
      message: ApiConstants.PRODUCTS_FETCHED_SUCCESSFULLY,
      code: StatusCodes.OK,
      data: mockProducts
    });

    const response = await request(app).get(`/api/v1/users/products`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body.message).to.equal(ApiConstants.PRODUCTS_FETCHED_SUCCESSFULLY);
    expect(response.body.data).to.deep.equal(mockProducts);
  });
  it("should fetch products with filters", async function() {
    const mockProducts = [
      { id: "1", name: "Laptop", price: 1000, category_id: "electronics", rating: 4.5 }
    ];

    fetchProductsStub.resolves({
      message: ApiConstants.PRODUCTS_FETCHED_SUCCESSFULLY,
      code: StatusCodes.OK,
      data: mockProducts
    });

    const response = await request(app)
      .get(`/api/v1/users/products`)
      .query({
        searchTerm: "Laptop",
        categoryId: "electronics",
        minPrice: 500,
        maxPrice: 1500,
        minRating: 4
      });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body.message).to.equal(ApiConstants.PRODUCTS_FETCHED_SUCCESSFULLY);
    expect(response.body.data).to.deep.equal(mockProducts);
    expect(fetchProductsStub.calledOnce).to.be.true;
    expect(fetchProductsStub.firstCall.args).to.deep.equal(["Laptop", "electronics", 500, 1500, 4]);
  });

  it("should handle no products found", async function() {
    fetchProductsStub.resolves({
      message: ApiConstants.NO_PRODUCTS_FOUND,
      code: StatusCodes.NOT_FOUND,
      data: []
    });

    const response = await request(app)
      .get(`/api/v1/users/products`)
      .query({ searchTerm: "NonexistentProduct" });

    expect(response.status).to.equal(StatusCodes.NOT_FOUND);
    expect(response.body.message).to.equal(ApiConstants.NO_PRODUCTS_FOUND);
    expect(response.body.data).to.be.an('array').that.is.empty;
  });

  it("should handle server errors", async function() {
    fetchProductsStub.rejects(new Error("Database error"));

    const response = await request(app).get(`/api/v1/users/products`);

    expect(response.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.message).to.equal(ApiConstants.DATABASE_ERROR);
  });
});

