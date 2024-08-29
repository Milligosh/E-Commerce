import { expect } from "chai";
import sinon, { SinonStub } from 'sinon';
import request from "supertest";
import app from "../index";
import { StatusCodes } from "../helper/statusCodes";
import { Userservice } from "../modules/users/services/user.services";
import pool from "../config/database/db";
import { ApiConstants } from "../helper/constants";

const baseUrl = '/api/v1/users';

describe("User Service Tests", function() {
  let createUserStub: SinonStub;
  let verifyOTPStub: SinonStub;
  let logInStub: SinonStub;
  let queryStub: SinonStub;

  beforeEach(function() {
    createUserStub = sinon.stub(Userservice, "createUser");
    verifyOTPStub = sinon.stub(Userservice, "verifyOTP");
    logInStub = sinon.stub(Userservice, "logIn");
    queryStub = sinon.stub(pool, "query");
  });

  afterEach(function() {
    sinon.restore();
  });

  it("should create a new user", async function() {
    const newUser = {
      fullname: "Test User",
      username: "testuser",
      email: "testuser@example.com",
      password: "Password123*"
    };

    createUserStub.resolves({
      message:ApiConstants.USER_CREATED_SUCCESSFULLY ,
      code: StatusCodes.CREATED,
      data: { id: "123", ...newUser }
    });

    const response = await request(app)
      .post(`${baseUrl}/signup`)
      .send(newUser);

    expect(response.status).to.equal(StatusCodes.CREATED);
    expect(response.body.message).to.equal(ApiConstants.USER_CREATED_SUCCESSFULLY);
    expect(response.body.data).to.have.property("id");
  });

  it("should not create a user with an existing email", async function() {
    const existingUser = {
      fullname: "Existing User",
      username: "existinguser",
      email: "testuser@example.com",
      password: "Password123*",
    };

    createUserStub.resolves({
      message:ApiConstants.EMAIL_ALREADY_EXISTS ,
      code: StatusCodes.CONFLICT,
      data: null
    });

    const response = await request(app)
      .post(`${baseUrl}/signup`)
      .send(existingUser);

    expect(response.status).to.equal(StatusCodes.CONFLICT);
    expect(response.body.message).to.equal(ApiConstants.EMAIL_ALREADY_EXISTS );
  });

  it("should verify OTP successfully", async function() {
    const verifyData = {
      email: "testuser@example.com",
      otp: "123456"
    };

    verifyOTPStub.resolves({
      message:ApiConstants.OTP_VERIFIED_SUCCESSFULLY ,
      code: StatusCodes.OK,
      data: { id: "123", email: "testuser@example.com", emailverified: true }
    });

    const response = await request(app)
      .post(`${baseUrl}/verify-otp`)
      .send(verifyData);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body.message).to.equal(ApiConstants.OTP_VERIFIED_SUCCESSFULLY);
  });

  it("should not login before OTP verification", async function() {
    const loginCredentials = {
      email: "testuser@example.com",
      password: "Password123*"
    };

    logInStub.resolves({
      message:ApiConstants.EMAIL_NOT_VERIFIED,
      code: StatusCodes.UNAUTHORIZED,
      data: null
    });

    const response = await request(app)
      .post(`${baseUrl}/login`)
      .send(loginCredentials);

    expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).to.equal(ApiConstants.EMAIL_NOT_VERIFIED);
  });
 it('should login a user', async function(){
  const loginCredentials = {
    email: "testuser@example.com",
    password: "Password123*"
  };

  logInStub.resolves({
    message:ApiConstants.USER_LOGGED_IN_SUCCESSFULLY,
    code: StatusCodes.OK,
    data: { id: "123", email: "testuser@example.com", emailverified: true }
  });

  const response = await request(app)
    .post(`${baseUrl}/login`)
    .send(loginCredentials);
    
  })
  it("should return 500 if a server error occurs", async function() {
    const invalidData = {
      email: null,
      password: null
    };

    logInStub.rejects(new Error("An error occurred during login"));

    const response = await request(app)
      .post(`${baseUrl}/login`)
      .send(invalidData);

    expect(response.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.message).to.equal("An error occurred during login");
  });
});