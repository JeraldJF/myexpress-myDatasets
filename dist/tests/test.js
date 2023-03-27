"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app = require("../routes/dataSets");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
process.env.NODE_ENV = "test";
let expect = chai.expect;
require("mocha");
var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
// var assert = require('chai').assert
// API tests
chai.use(chaiHttp);
describe("/GET datasets", () => {
    it("It should display the datasets", (done) => {
        chai
            .request(app)
            .get("/datasets/get")
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.headers["content-type"].should.contains("application/json");
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
describe("/GET route invalid", () => {
    it("It should not display the datasets", (done) => {
        chai
            .request(app)
            .get("/datasets/")
            .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
describe("/GET/:id datasets by id", () => {
    it("It should display the datasets by id", (done) => {
        chai
            .request(app)
            .get("/datasets/id/d24")
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            // res.body.length.should.be.eql(0);
            res.headers["content-type"].should.contains("application/json");
            done();
        });
    });
});
describe("/GET/:id id does not exist", () => {
    it("It should not display the datasets by id", (done) => {
        chai
            .request(app)
            .get("/datasets/id/p01")
            .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
});
// describe('/POST add datasets', () => {
//   it('It should insert datasets', (done:any) => {
//       let data = {
//           id: "d29",
//           data_schema: {
//               name: "name5",
//               age: 13
//           },
//           router_config: {
//               name: "user2",
//               method: "Put"
//           },
//           status: "ACTIVE",
//           created_by: "cloud2",
//           updated_by: "user3"
//       }
//     chai.request(app)
//         .post('/datasets/addData')
//         .send(data)
//         .end((err:any, res:any) => {
//               res.should.have.status(200);
// res.body.should.be.a('object');
//           done();
//         });
//   });
// });
describe("/POST wrong datatypes", () => {
    it("It should not insert datasets", (done) => {
        let data = {
            id: 45,
            data_schema: {
                name: "name5",
                age: 13,
            },
            router_config: {
                name: "user2",
                method: "Put",
            },
            status: "Accepted",
            created_by: "cloud2",
            updated_by: "user3",
        };
        chai
            .request(app)
            .post("/datasets/addData")
            .send(data)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            done();
        });
    });
});
describe("/POST primary key voilation", () => {
    it("It should not insert datasets", (done) => {
        let data = {
            id: "d22",
            data_schema: {
                name: "name5",
                age: 13,
            },
            router_config: {
                name: "user2",
                method: "Put",
            },
            status: "Accepted",
            created_by: "cloud2",
            updated_by: "user3",
        };
        chai
            .request(app)
            .post("/datasets/addData")
            .send(data)
            .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            done();
        });
    });
});
describe("/POST id missing", () => {
    it("It should not insert datasets", (done) => {
        chai
            .request(app)
            .post("/datasets/addData")
            .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });
});
describe("/PUT/:id Update data", function () {
    it("Updates a particular dataset", function (done) {
        let data = {
            data_schema: {
                name: "name5",
                age: 13,
            },
            router_config: {
                name: "user3",
                method: "Put",
            },
            status: "Accepted",
            created_by: "cloud2",
            updated_by: "user3",
        };
        chai
            .request(app)
            .put("/datasets/updateData/140")
            .send(data)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});
describe("/PUT/:id Incorrect datatype", function () {
    it("Does not Update a particular dataset", function (done) {
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
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
describe("/PUT/:id Id does not exist", function () {
    it("Does not Update a particular dataset", function (done) {
        let data = {
            data_schema: {
                name: "name5",
                age: 13,
            },
            router_config: {
                name: "user3",
                method: "Put",
            },
            status: "Accepted",
            created_by: "cloud2",
            updated_by: "user3",
        };
        chai
            .request(app)
            .put("/datasets/updateData/abcdefgh")
            .send(data)
            .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
describe("/PATCH/:id Update a particular dataset", function () {
    it("Datasets updated successfully", function (done) {
        let data = {
            status: "Accepted",
            created_by: "cloud2",
            updated_by: "user3",
        };
        chai
            .request(app)
            .patch("/datasets/patchData/206")
            .send(data)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
describe("/PATCH/:id Incorrect datatype", function () {
    it("Does not Update a particular dataset", function (done) {
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
            .patch("/datasets/patchData/d02")
            .send(data)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
describe("/PATCH/:id Id does not exist", function () {
    it("Does not Update a particular dataset", function (done) {
        let data = {
            status: "Accepted",
            created_by: "cloud2",
            updated_by: "user3",
        };
        chai
            .request(app)
            .put("/datasets/patchData/r01")
            .send(data)
            .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
// describe('/DELETE/:id datasets by id', () => {
//   it('It should delete the dataset by id', (done:any) => {
//     chai.request(app)
//         .delete('/datasets/deleteData/d27')
//         .end((err:any, res:any) => {
//               res.should.have.status(200);
// res.body.should.be.a('object');
//               // res.body.length.should.be.eql(0);
//           done();
//         });
//   });
// });
describe("/DELETE/:id id does not exist", () => {
    it("It should not delete the dataset by id", (done) => {
        chai
            .request(app)
            .delete("/datasets/deleteData/145")
            .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
//# sourceMappingURL=test.js.map