import app from "../../app";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import "dotenv/config"

chai.use(chaiHttp);
let token = "";

describe("POST API /api/subscriber", () => {
  before(() => {
    mongoose.connection.dropCollection("subscribers");
  });
  const subscriber = {
    Email: "castlewitty9@gmail.com",
  };
  it("Should return Email validation", (done) => {
    const fakeMail = "rude.gmail.com";
    chai
      .request(app)
      .post("/api/subscriber/")
      .send(fakeMail)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status([400]);
        expect(res.body).to.have.property("message");
        return done();
      });
  });

  it("should successfully create a subscriber and return 201", (done) => {
    chai
      .request(app)
      .post("/api/subscriber/")
      .send(subscriber)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(201);
        expect(res.body).haveOwnProperty("success");
        expect(res.body).haveOwnProperty("data");
        return done();
      });
  });

  it("should fail with 400 if email exist", (done) => {
    chai
      .request(app)
      .post("/api/subscriber/")
      .send(subscriber)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        return done();
      });
  });
});

describe("POST API /api/user", () => {
  before(() => {
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
        expect(res.status).to.equal(200);
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
        expect(res.status).to.have.status(409);
        return done();
      });
  });
});

describe("POst API /api/user/login", () => {
  before(() => {
    mongoose.connection.dropCollection("login");
  });
  const user = {
    email: "placidetwiringiyimana12345@gmail.com",
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



  describe("GET API /api/subscriber", () => {
    it("Should return all list of all subscribers", (done) => {
      chai
        .request(app)
        .get("/api/subscriber/")
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

  describe("delete api /api/subscriber",()=>{
    const subsId = "1229b52ca50601182da72457";
      it("Should delete a user according to id",(done)=>{
          chai
          .request(app)
          .delete("/api/subscriber/"+subsId)
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
     it("should return 404 when subscriber not found",(done)=>{
        const fakeId = "1229b52ca50601182fgghjh";
        chai
        .request(app)
        .delete("/api/subscriber/"+fakeId)
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
