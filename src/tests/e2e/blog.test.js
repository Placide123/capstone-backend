import app from "../../app";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import "dotenv/config";
chai.use(chaiHttp);

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

describe("post API /api/user/login", () => {
  before(() => {
    mongoose.connection.dropCollection("login");
  });
  const user = {
    email: "placidetwiringiyimana123456@gmail.com",
    password: "placide"
  };

  let token = "";
  it("it should successfully login and return 200", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
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
      .post("/api/user/login")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        return done();
      });
  });

  describe("POST API /api/blog/save", () => {
    before(() => {
      mongoose.connection.dropCollection("blogs");
    });
    const blog = {
      title: "ATLP RWANDA",
      author: "placidetwiringiyimana",
      description: "Andela Technical Leadership Program Rwanda",
      photo: "Photo"
    };
    it("it should successfully create blog and return 201", (done) => {
      chai
        .request(app)
        .post("/api/blog/save")
        .set("Authorization", `Bearer ${token}`)
        .send(blog)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.be.equal(201);
          expect(res.body).to.haveOwnProperty("data");
          expect(res.body).to.haveOwnProperty("success");
          return done();
        });
    });

    // it("Should return 400 when your data is not valid", (done) => {
    //   const fakeBlog = {
    //     title: "",
    //     author: "placidetwiringiyimana",
    //     description: "Andela Technical",
    //     photo: "Photo"
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/blog/save")
    //     .send(fakeBlog)
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.have.property("message");
    //       return done();
    //     });
    // });

    it("Should return 409 when title of blog exists", (done) => {
      const oldBlog = blog.title;
      chai
        .request(app)
        .post("/api/blog/save")
        .send(blog)
        .end((err, res) => {
          if (oldBlog) return done(err);
          expect(res).to.have.status(409);
          return done();
        });
    });


  });

  describe("GET API /api/blog/get", () => {
    it("Should return all blogs", (done) => {
      chai
        .request(app)
        .get("/api/blog/get")
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

  describe("delete api /api/blog/delete/:id", () => {
    const blogId = "1229b52ca50601182da72457";
    it("Should delete a blog according to it's id", (done) => {
      chai
        .request(app)
        .delete("/api/blog/delete/" + blogId)
        .set("Authorization", `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(202);
          expect(res.body).to.have.property("success");
          expect(res.body).to.have.property("data");
          return done();
        });
    });
    it("should return 404 when blog doesn't exist", (done) => {
      const fakeId = "1229b52ca50601182fgghjh";
      chai
        .request(app)
        .delete("/api/blog/delete/" + fakeId)
        .set("Authorization", `Bearer ${token}`)
        .send()
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("error");
          return done();
        });
    });
  });

  describe("GET API /api/blog/:id/", () => {
    before(() => {
      mongoose.connection.dropCollection("posts");
    });
  
    const post = {
      title: "ATLP RWANDA",
      author: "placidetwiringiyimana",
      description: "Andela Technical Leadership Program Rwanda",
      photo: "Photo"
    };
    let postId;

    // it("should get all comment on blog by id", (done) => {
    //   chai
    //     .request(app)
    //     .post("/api/blog/save")
    //     .send(post)
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       postId = res.body._id;
    //       chai
    //         .request(app)
    //         .get("/api/blog/" + postId)
    //         .set("Authorization", `Bearer ${token}`)
    //         .end((err, res) => {
    //           if (err) return done(err);
    //           expect(res.status).to.eql(201);
    //           return done();
    //         });
    //     });
    // });
  });
});
