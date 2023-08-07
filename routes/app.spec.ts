
var chai = require("chai");
var chaiHttp = require("chai-http");

import { expect } from "chai";
import app from "../app";
import * as db from "../helpers/src";
var spies = require("chai-spies");
chai.use(spies);
chai.use(chaiHttp);
chai.should();

describe("/GET", () => {
  afterEach(() => {
    chai.spy.restore();
  });

  it("should GET datasets", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1, rows: [{}] };
    });

    chai
      .request(app)
      .get("/datasets/get")
      .end((err: any, response: any) => {
        response.should.have.status(200);
        response.body.should.be.an("array");
        response.body.length.should.be.not.eql(0);

        done();
      });
  });
  it("should not GET datasets", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0, rows: [] };
    });

    chai
      .request(app)
      .get("/datasets/get")
      .end((err: any, response: any) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
  });
});


describe("/GET:id", () => {
  afterEach(() => {
    chai.spy.restore();
  });
  it("should GET datasets of given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1, rows: [{ id: "getid" }] };
    });

    chai
      .request(app)
      .get("/datasets/id/128")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(200);
        response.body.should.be.an("array");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
  });
  it("should not GET datasets with given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });

    chai
      .request(app)
      .get("/datasets/id/56")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(404);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
  });
});







describe("/POST:id", () => {
  afterEach(() => {
    chai.spy.restore();
  });
  it("should not Post datasets", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1, rows: [{ id: "postedid" }] };
    });

    chai
      .request(app)
      .post("/datasets/addData")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(200);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
    //
  });
  it("should Post datasets", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });
    chai
      .request(app)
      .post("/datasets/addData")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(409);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
  });
  it("datatype Invalid", (done: any) => {
    let data = {
      data_schema: {
        name: "name5",
        age: 13,
      },
      router_config: {
        name: "user1",
        method: "post",
      },
      status: 1,
      created_by: "cloud2",
      updated_by: "user3",
    };
    chai
      .request(app)
      .post("/datasets/addData")
      .send(data)
      .end((err: any, res: any) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/DELETE:id", () => {
  afterEach(() => {
    chai.spy.restore();
  });
  it("should DELETE datasets of given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1 };
    });

    chai
      .request(app)
      .delete("/datasets/deleteData/db01")
      .end((err: any, response: any) => {
        response.should.have.status(200);
        // response.body.should.be.an("object");
        expect(response.body).to.be.an("object");
        // expect(response.body.status).to.be()
        // response.body.length.should.be.eql(0);
        done();
      });
  });

  it("should not delete datasets with given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });

    chai
      .request(app)
      .delete("/datasets/deleteData/db01")
      .end((err: any, response: any) => {
       
        response.should.have.status(404);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
  });
});

describe("/UPDATE:ID", () => {
  afterEach(() => {
    chai.spy.restore();
  });
  it("should UPDATE datasets of given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1 };
    });

    chai
      .request(app)
      .put("/datasets/updateData/35")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(200);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
  });
  it("should not UPDATE datasets with given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });

    chai
      .request(app)
      .put("/datasets/updateData/35")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(404);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
  });
  it("Invalid datatype to put", function (done: any) {
    let data = {
      data_schema: {
        name: "name5",
        age: 13,
      },
      router_config: "yo",
      status: "Accepted",
      created_by: "cloud2",
      updated_by: "user3",
    };
    chai
      .request(app)
      .put("/datasets/updateData/140")
      .send(data)
      .end((err: any, res: any) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        // res.body.length.should.be.eql(0);
        done();
      });
  });
});

describe("Route", () => {
  afterEach(() => {
    chai.spy.restore();
  });
  it("Invalid route", (done) => {
    chai.spy.on(app, "get", () => {
      return { params: { "0": "/datasets/g" } };
    });
    chai
      .request(app)
      .get("/datasets/g")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(404);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        done();
      });
  });
});

describe("/PARTIAL_UPDATE:ID", () => {
  afterEach(() => {
    chai.spy.restore();
  });
  let pdata = {
    data_schema: {
      name: "name5",
      age: 13,
    },
    router_config: {
      name: "name5",
      age: 13,
    },
    status: "Accepted",
    created_by: "cloud2",
    updated_by: "user3",
  };
  it("should PATCH UPDATE datasets of given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1 };
    });

    chai
      .request(app)
      .get("/datasets/id/687")
      .end((err: any, response: any) => {
        // console.log(response.status);

        if (response.status == 200) {
          chai
            .request(app)
            .patch("/datasets/patchData/687")
            .send(pdata)
            .end((err: any, response: any) => {
              // console.log(response.body);

              response.should.have.status(200);
              response.body.should.be.an("object");
              // expect(response.body).to.be.an("array")
              // response.body.length.should.be.eql(0);
              done();
            });
        }
      });
  });

  it("should not PATCH UPDATE datasets of given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });

    chai
      .request(app)
      .get("/datasets/id/687")
      .end((err: any, response: any) => {
        // console.log(response.status);

        if (response.status != 200) {
          chai
            .request(app)
            .patch("/datasets/patchData/687")
            .send(pdata)
            .end((err: any, response: any) => {
              // console.log(response.body);

              response.should.have.status(404);
              response.body.should.be.an("object");
              // expect(response.body).to.be.an("array")
              // response.body.length.should.be.eql(0);
              done();
            });
        }
      });
  });

  // it("invalid datatype to patch", function (done: any) {
  //   let data = {
  //     data_schema: {
  //       name: "name5",
  //       age: 13,
  //     },
  //     router_config: {
  //       name: "user1",
  //       method: "post"
  //     },
  //     status: 1,
  //     created_by: "cloud2",
  //     updated_by: "user3",
  //   };
  //   chai
  //     .request(app)
  //     .patch("/datasets/patchData/d02")
  //     .send(data)
  //     .end((err: any, res: any) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a("object");
  //       // res.body.length.should.be.eql(0);
  //       done();
  //     });
  // });
});
