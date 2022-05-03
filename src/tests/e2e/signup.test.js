import app from "../../app";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import "dotenv/config"
chai.use(chaiHttp);

let token = "";

describe("POST API /api/user", () => {
  before(() => {
    mongoose.connection.dropCollection("users");
  });
  const user = {
    firstName: "placide",
    lastName: "Twiringiyimana",
    email: "placidetwiringiyimana123456@gmail.com",
    role: "admin",
    password: "placide"
  };
  it("should successfully create an account and return 200", (done) => {
    chai
      .request(app)
      .post("/api/user/")
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
      .post("/api/user/")
      .send(user)
      .end((err, res) => {
        if (oldUser) return done(err);
        expect(res).to.have.status(409);
        return done();
      });
  });
});

describe("POst API /api/user/login", () => {

  before(() => {
    mongoose.connection.dropCollection("login");
  });

  const user = {
    email: "placidetwiringiyimana123456@gmail.com",
    password: "placide"
  }; 

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
    const user1 = {
      email: "placidetwiringiyimana@gmail.com",
      password: "123"
    };
    chai
      .request(app)
      .post("/api/user/login/")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message");
        return done();
      });
  });

  describe("GET API /api/user/get", () => {
    it("Should return all list of user who are registered", (done) => {
      chai
        .request(app)
        .get("/api/user/get")
        .set("Authorization", `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success");
          expect(res.body).to.have.property("data");
          return done();
        });
    });
  });


  
  describe("delete api /api/user/delete/",()=>{
    const userId = "1229b52ca50601182da72457";
      it("Should delete a user according to id",(done)=>{
          chai
          .request(app)
          .delete("/api/user/delete/"+userId)
          .set("Authorization", `Bearer ${token}`)
          .send()
          .end((err,res)=>{
              if(err) return done(err);
              expect(res).to.have.status(202);
              expect(res.body).to.have.property("success");
			        expect(res.body).to.have.property("data");
              return done();
          })
      })
     it("should return 404 when a user not found",(done)=>{
        const fakeUserId = "1229b52ca50601182fgghjh";
        chai
        .request(app)
        .delete("/api/user/delete/"+fakeUserId)
        .set("Authorization", `Bearer ${token}`)
        .send()
        .end((err,res)=>{
            if(err) return done(err);
            expect(res).to.have.status(404);
            return done();
        })
     })
  })
});
