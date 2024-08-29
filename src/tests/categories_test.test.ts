import { expect } from "chai";
import sinon, { SinonStub } from 'sinon';
import request from "supertest";
import app from "../index";
import { StatusCodes } from "../helper/statusCodes";
import { CategoryServices } from "../modules/categories/services/category";
import * as auth from "../middlewares/authorization";
import { ApiConstants } from "../helper/constants";
import jwt from 'jsonwebtoken';

const baseUrl = '/api/v1/category';

describe("Categories tests", function() {
  let createCategoryStub: SinonStub;
  let authStub: SinonStub;
  let isAdminStub: SinonStub;

  beforeEach(function() {
    createCategoryStub = sinon.stub(CategoryServices, "createCategory");
    authStub = sinon.stub(auth, "default").callsFake((req, res, next) => next());
    isAdminStub = sinon.stub(auth, "isAdmin").callsFake((req, res, next) => {next();
      return undefined; });
   
  });

  afterEach(function() {
    sinon.restore();
  });

  it("should create a new category with admin token", async function() {
    const newCategory = { name: "Test Category" };
    const adminUser = { id: "admin123", role: "admin" };
    const token = jwt.sign(adminUser, process.env.JWT_SECRET_KEY || 'test_secret');

    const expectedResponse = {
      message: ApiConstants.CATEGORY_CREATED,
      code: StatusCodes.CREATED,
      data: { id: "cat123", ...newCategory }
    };

    createCategoryStub.resolves(expectedResponse);

    const response = await request(app)
      .post(`${baseUrl}/create-category`)
      .set('Authorization', `Bearer ${token}`)
      .send(newCategory);

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).to.equal(StatusCodes.CREATED);
    expect(response.body.message).to.equal(ApiConstants.CATEGORY_CREATED);
    expect(response.body.data).to.have.property('id');
    expect(response.body.data.name).to.equal(newCategory.name);
  });

  // it("should not create a category without admin token", async function() {
  //   const newCategory = { name: "Test Category" };

  //   // Reset the stubs to their default behavior
  //   authStub.callsFake((req, res, next) => res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' }));
  //   isAdminStub.callsFake((req, res, next) => res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' }));

  //   const response = await request(app)
  //     .post(`${baseUrl}/create-category`)
  //     .send(newCategory);

  //   expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
  //   expect(response.body.message).to.equal('Unauthorized');
  // });

  // it("should not create a category with invalid data", async function() {
  //   const adminUser = { id: "admin123", role: "admin" };
  //   const token = jwt.sign(adminUser, process.env.JWT_SECRET_KEY || 'test_secret');
  //   const invalidCategory = { name: "" };

  //   const response = await request(app)
  //     .post(`${baseUrl}/create-category`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(invalidCategory);

  //   expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
  // });

  it("should not create a duplicate category", async function() {
    const existingCategory = { name: "Existing Category" };
    const adminUser = { id: "admin123", role: "admin" };
    const token = jwt.sign(adminUser, process.env.JWT_SECRET_KEY || 'test_secret');

    createCategoryStub.resolves({
      message: ApiConstants.CATEGORY_ALREADY_EXISTS,
      code: StatusCodes.CONFLICT,
      data: null
    });

    const response = await request(app)
      .post(`${baseUrl}/create-category`)
      .set('Authorization', `Bearer ${token}`)
      .send(existingCategory);

    expect(response.status).to.equal(StatusCodes.CONFLICT);
    expect(response.body.message).to.equal(ApiConstants.CATEGORY_ALREADY_EXISTS);
  });
});