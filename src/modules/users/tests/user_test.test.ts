import { expect } from "chai"; // Chai is used for making assertions about the test results
import request from "supertest"; 
import app from "../../../index"; 
import { StatusCodes } from "../../../helper/statusCodes";
import pool from "../../../config/database/db"; 
import bcrypt from 'bcrypt'
import { Userservice } from "../services/user.services";
import sinon from 'sinon'


const baseUrl = '/api/v1/users'

describe("User Service Tests", function() {
  this.timeout(10000); 

  
  before(async function() {
    try {
      await pool.query('DELETE FROM users');
      console.log("Database cleared successfully");
      
    } catch (error) {
      console.error("Error clearing database:", error);
    }
  });
  it("should create a new user", function(done) {
    const newUser = {
      fullname: "Test User", 
      username: "testuser", 
      email: "testuser@example.com",
      password: "Password123*", 
    };

    request(app)
      .post(`${baseUrl}/signup`) 
      .send(newUser)
      .end((err, response) => {
        if (err) {
          return done(err); 
        }
        console.log("Create user response:", response.body);
        expect(response.status).to.equal(StatusCodes.CREATED);
        expect(response.body.message).to.equal("User created successfully"); 
        expect(response.body.data).to.have.property("id"); 
        done(); 
      });
  });

  
  it("should not create a user with an existing email", function(done) {
    const existingUser = {
      fullname: "Existing User",
      username: "existinguser",
      email: "testuser@example.com", 
      password: "Password123*",
    };
        request(app)
      .post(`${baseUrl}/signup`)
      .send(existingUser)
      .end((err, response) => {
        if (err) {
          return done(err); 
        }
        
        console.log("Existing email response:", response.body);
   
        expect(response.status).to.equal(StatusCodes.CONFLICT); 
        expect(response.body.message).to.equal("Email already exists"); 
        done(); 
      });
  });
  

  it("should verify OTP, update email verification status, and return 200", async function() {
    const mockResult = {
      otp: bcrypt.hashSync("correctOTP", 10),
      otpExpiration: new Date(Date.now() + 10000), 
    };

    const queryStub = sinon.stub(pool, "query");

    queryStub.onFirstCall().resolves({ rows: [mockResult] });

    // Stub the second call to simulate the email verification update
    const updatedResult = { id: 1, email: "test@example.com", emailverified: true };
    queryStub.onSecondCall().resolves({ rows: [updatedResult] });

    const result = await Userservice.verifyOTP("test@example.com", "correctOTP");

    expect(result.code).to.equal(StatusCodes.OK);
    expect(result.message).to.equal("OTP verified successfully");
    expect(result.data).to.have.property("id", 1);
    expect(result.data).to.have.property("email", "test@example.com"); 
  });

  it("should return 500 if a server error occurs", function(done) {
   
    const invalidData = {
      email: null,
      password: null
    };

    request(app)
      .post(`${baseUrl}/login`)
      .send(invalidData)
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        expect(response.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(response.body.message).to.equal("An error occurred during login");
        done();
      });
  });
});
