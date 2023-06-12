"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var chai = require("chai");
var chaiHttp = require("chai-http");
const app_1 = __importDefault(require("../app"));
const db = __importStar(require("../helpers/testCon"));
// import { query } from 'express';
var spies = require("chai-spies");
chai.use(spies);
chai.use(chaiHttp);
chai.should();
// const sandbox = chai.spy.sandbox();
// chai.use(should)
describe("/GET", () => {
    it("should GET datasets", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rows: [{}] };
        });
        chai
            .request(app_1.default)
            .get("/datasets/get")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(200);
            response.body.should.be.an("array");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
    it("should not GET datasets", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 0, rows: [] };
        });
        chai
            .request(app_1.default)
            .get("/datasets/get")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(404);
            response.body.should.be.an("object");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
});
describe("/GET:id", () => {
    it("should GET datasets of given id", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 1, rows: [{ id: "getid" }] };
        });
        chai
            .request(app_1.default)
            .get("/datasets/id/128")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(200);
            response.body.should.be.an("array");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
    it("should not GET datasets with given id", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 0 };
        });
        chai
            .request(app_1.default)
            .get("/datasets/id/56")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(404);
            response.body.should.be.an("object");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
});
describe("/POST:id", () => {
    it("should not Post datasets", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 1, rows: [{ id: "postedid" }] };
        });
        chai
            .request(app_1.default)
            .post("/datasets/addData")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(409);
            response.body.should.be.an("object");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
        //
    });
    it("should Post datasets", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 0 };
        });
        chai
            .request(app_1.default)
            .get("/datasets/id/45")
            .end((err, response) => {
            // console.log(response);
            if (response.status == 404) {
                chai
                    .request(app_1.default)
                    .post("/datasets/addData")
                    .end((err, response) => {
                    // console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.an("object");
                    // expect(response.body).to.be.an("array")
                    // response.body.length.should.be.eql(0);
                    chai.spy.restore(db.pool, "query");
                    done();
                });
            }
        });
    });
    it("datatype Invalid", (done) => {
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
            .request(app_1.default)
            .post("/datasets/addData")
            .send(data)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a("object");
            done();
        });
    });
});
describe("/DELETE:id", () => {
    it("should DELETE datasets of given id", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 1 };
        });
        chai
            .request(app_1.default)
            .delete("/datasets/deleteData/db01")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(200);
            response.body.should.be.an("object");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
    it("should not delete datasets with given id", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 0 };
        });
        chai
            .request(app_1.default)
            .delete("/datasets/deleteData/db01")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(404);
            response.body.should.be.an("object");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
});
describe("/UPDATE:ID", () => {
    it("should UPDATE datasets of given id", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 1 };
        });
        chai
            .request(app_1.default)
            .put("/datasets/updateData/35")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(200);
            response.body.should.be.an("object");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
    it("should not UPDATE datasets with given id", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 0 };
        });
        chai
            .request(app_1.default)
            .put("/datasets/updateData/35")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(404);
            response.body.should.be.an("object");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
    it("Invalid datatype to put", function (done) {
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
            .request(app_1.default)
            .put("/datasets/updateData/140")
            .send(data)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a("object");
            // res.body.length.should.be.eql(0);
            done();
        });
    });
});
describe("/PARTIAL_UPDATE:ID", () => {
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
            .request(app_1.default)
            .get("/datasets/id/687")
            .end((err, response) => {
            // console.log(response.status);
            if (response.status == 200) {
                chai
                    .request(app_1.default)
                    .patch("/datasets/patchData/687")
                    .send(pdata)
                    .end((err, response) => {
                    // console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.an("object");
                    // expect(response.body).to.be.an("array")
                    // response.body.length.should.be.eql(0);
                    chai.spy.restore(db.pool, "query");
                    done();
                });
            }
        });
    });
    //   it("should update individual data for given id if present", (done) => {
    //     chai.spy.on(db.pool, "query", () => {
    //       return { rowCount: 0 };
    //     });
    //     chai
    //       .request(app)
    //       .patch("/datasets/partialupdate/aaa")
    //       .send(patchDataschema)
    //       .end((err: any, response: any) => {
    //         // console.log(response.body);
    //         expect(response.status).to.be.equal(400);
    //         expect(response.body).to.be.an("object");
    //         chai.spy.restore(db.pool, "query");
    //         done();
    //       });
    //   });
    // it("should update individual data for given id if present", (done) => {
    //     chai.spy.on(db.pool, "query", () => {
    //       return { rows: [{}] };
    //     });
    //     chai
    //       .request(app)
    //       .get("/datasets/getrecord/111")
    //       .end((err: any, response: any) => {
    //         if (response.body.status != 200) {
    //           chai
    //             .request(app)
    //             .patch("/datasets/partialupdate/111")
    //             .send(patchDataschema)
    //             .end((err: any, response: any) => {
    //               console.log(response.body);
    //               console.log(response.status);
    //               expect(response.status).to.be.equal(200);
    //               expect(response.body).to.be.an("object");
    //               chai.spy.restore(db.pool, "query");
    //               done();
    //             });
    //         }
    //       });
    //   });
    it("should not PATCH UPDATE datasets of given id", (done) => {
        chai.spy.on(db.pool, "query", () => {
            return { rowCount: 0 };
        });
        chai
            .request(app_1.default)
            .get("/datasets/id/687")
            .end((err, response) => {
            // console.log(response.status);
            if (response.status != 200) {
                chai
                    .request(app_1.default)
                    .patch("/datasets/patchData/687")
                    .send(pdata)
                    .end((err, response) => {
                    // console.log(response.body);
                    response.should.have.status(404);
                    response.body.should.be.an("object");
                    // expect(response.body).to.be.an("array")
                    // response.body.length.should.be.eql(0);
                    chai.spy.restore(db.pool, "query");
                    done();
                });
            }
        });
    });
    it("invalid datatype to patch", function (done) {
        // chai.spy.on(db.pool, "query", () => {
        //   return { rowCount: 1 };
        // });
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
        // chai
        //   .request(app)
        //   .get("/datasets/id/46")
        //   .end((err: any, response: any) => {
        //     // console.log(response);
        //     if (response.status == 404) {
        chai
            .request(app_1.default)
            .patch("/datasets/patchData/d02")
            .send(data)
            .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a("object");
            // res.body.length.should.be.eql(0);
            done();
        });
        // }
        // });
    });
});
describe("Route", () => {
    it("Invalid route", (done) => {
        chai.spy.on(app_1.default, "get", () => {
            return { params: { "0": "/datasets/g" } };
        });
        chai
            .request(app_1.default)
            .get("/datasets/g")
            .end((err, response) => {
            // console.log(response.body);
            response.should.have.status(404);
            response.body.should.be.an("object");
            // expect(response.body).to.be.an("array")
            // response.body.length.should.be.eql(0);
            chai.spy.restore(db.pool, "query");
            done();
        });
    });
});
//# sourceMappingURL=test.js.map