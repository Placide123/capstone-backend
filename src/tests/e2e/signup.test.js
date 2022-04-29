import app from "../../app";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import "dotenv/config"
chai.use(chaiHttp);



describe("POST API /api/user", () => {
  beforeEach(() => {
    mongoose.connection.dropCollection("users");
  });
  afterEach(()=>{
    mongoose.connection.dropCollection("users"); 
  });
  const user = {
    firstName: "placide",
    lastName: "Twiringiyimana",
    email: "placidetwiringiyimana12345@gmail.com",
    role: "admin",
    password: "placide",
  };
  it("should successfully create an account and return 200", (done) => {
    chai
      .request(app)
      .post("/api/user")
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        return done();
      });
  });
  

  it("Should return 409 when email exists", (done) => {
    const oldUser = user.email;
    chai
      .request(app)
      .post("/api/user")
      .send(user)
      .end((err, res) => {
        if (oldUser) return done(err);
        expect(res).to.have.status(409);
        return done();
      });
  });
});

describe("POst API /api/user/login", () => {

  
  beforeEach(() => {
    mongoose.connection.dropCollection("login");
  });
  afterEach(()=>{
    mongoose.connection.dropCollection("login"); 
  })
  const user = {
    email: "placidetwiringiyimana1234@gmail.com",
    password: "placide",
  };
  const user1 = {
    email: "placidetwiringiyimana@gmail.com",
    password: "123",
  };
  const messages = {
    Name: "Twiringiyimana",
    Email: "castlewitty9@gmail.com",
    message: "hello beautiful people",
  };
  let token = "";
  it("it should successfully login and return 200", (done) => {
    chai
      .request(app)
      .post("/api/user/login/")
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("success");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("token");
        return done();
      });
  });

  it("should denie it because of invalid credentials", (done) => {
    chai
      .request(app)
      .post("/api/user/login/")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        return done();
      });
  });
});
