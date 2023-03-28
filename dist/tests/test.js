"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
require("mocha");
const sinon = require('sinon');
const request = require("../routes/dataSets");
// const request = require('request');
let chai = require("chai");
const should = chai.should();
// const app=require();
const base = 'http://localhost:3006';
describe('datasets', () => {
    describe('when not stubbed', () => {
        // test cases
    });
    describe('when stubbed', () => {
        // beforeEach(() => {
        //   get = sinon.stub(request, 'get');
        // });
        // afterEach(() => {
        //   request.restore();
        // });
        // test cases
        // describe('when stubbed', () => {
        const responseObject = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json'
            }
        };
        const responseBody = {
            status: 'success',
            data: [
                {
                    id: "d24",
                    data_schema: {
                        name: "name5",
                        age: 13
                    },
                    router_config: {
                        name: "user2",
                        method: "Put"
                    },
                    status: "ACTIVE",
                    created_by: "cloud2",
                    updated_by: "user3"
                }
                // {
                //   id: 5,
                //   name: 'Jurassic Park',
                //   genre: 'Science Fiction',
                //   rating: 9,
                //   explicit: true
                // },
                // {
                //   id: 6,
                //   name: 'Ice Age: Dawn of the Dinosaurs',
                //   genre: 'Action/Romance',
                //   rating: 5,
                //   explicit: false
                // }
            ]
        };
        beforeEach(() => {
            request.get = sinon.stub(request, 'get');
        });
        afterEach(() => {
            request.get.restore();
        });
        describe('GET', () => {
            it('should return data', (done) => {
                request.get.yields(null, responseObject, JSON.stringify(responseBody));
                request.get(`${base}/datasets/get`, (err, res, body) => {
                    // there should be a 200 status code
                    res.statusCode.should.eql(200);
                    // the response should be JSON
                    res.headers['content-type'].should.contain('application/json');
                    // parse response body
                    body = JSON.parse(body);
                    // the JSON response body should have a
                    // key-value pair of {"status": "success"}
                    body.status.should.eql('success');
                    // the JSON response body should have a
                    // key-value pair of {"data": [3 movie objects]}
                    body.data.length.should.eql(1);
                    // the first object in the data array should
                    // have the right keys
                    // body.data[0].should.include.keys(
                    //   'id', 'name', 'genre', 'rating', 'explicit'
                    // );
                    // the first object should have the right value for name
                    body.data[0].id.should.eql('d24');
                    done();
                });
            });
        });
    });
});
// });
// /api/v1/movies`
/*



import sinon from "sinon";
// import { expect } from "chai";

import "mocha";
// import pg from "pg";
import getDataSetById from "../public/typescripts/getDatasetById";
import removeDataSet from "../public/typescripts/removeDataSet";
import getDataSet from "../public/typescripts/getDataSet";
import addDataSets from "../public/typescripts/addDataSets";
import updateDataSet from "../public/typescripts/updateDataSet";
import partialupdate from "../public/typescripts/partialupdate";

// import pool from "../Config/Connection";
const request = require("request");
const app = require("../routes/dataSets");
// const faker = require("faker");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();


let expect = chai.expect;

var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = chai.assert;

// API tests
chai.use(chaiHttp);



let mydata = sinon.stub(app, "get");
describe("/GET ", () => {
  it("It should display the datasets", (done: any) => {
    let data = 100;
    mydata.withArgs("/datasets/get", getDataSet).returns(data);
    expect(app.get("/datasets/get", getDataSet)).to.be.equal(data);
    done();
  });
});

describe("/GET/:id ", () => {
  it("It should display the datasets by id", (done: any) => {
    let data = 100;
    // let mydata=sinon.stub(app,"get");
    mydata.withArgs("/datasets/id/d2", getDataSetById).returns(data);
    expect(app.get("/datasets/id/d2", getDataSetById)).to.be.equal(data);
    done();
  });
  
  
});



describe("/POST", () => {
  it("create data", (done: any) => {
    let mydata = sinon.stub(app, "post");
    mydata.withArgs("/datasets/addData", addDataSets).onFirstCall().returns(200).onSecondCall().returns(300);
    expect(
      app.post("/datasets/addData", addDataSets)
    ).to.be.equal(200);
    expect(
      app.post("/datasets/addData", addDataSets)
    ).to.be.equal(300);
    done();
  });
});




describe("/PUT", () => {
  it("UPDATE data", (done: any) => {
    let mydata = sinon.stub(app, "put");
    mydata.withArgs("/datasets/updateData/:id", updateDataSet).onFirstCall().returns(200).onSecondCall().returns(300);
    expect(
      app.put("/datasets/updateData/:id", updateDataSet)
    ).to.be.equal(200);
    expect(
      app.put("/datasets/updateData/:id", updateDataSet)
    ).to.be.equal(300);
    done();
  });
});


describe("/PATCH", () => {
  it("UPDATE PARTIAL data", (done: any) => {
    let mydata = sinon.stub(app, "patch");
    mydata.withArgs("/datasets/patchData/:id", partialupdate).onFirstCall().returns(200).onSecondCall().returns(300);
    expect(
      app.patch("/datasets/patchData/:id", partialupdate)
    ).to.be.equal(200);
    expect(
      app.patch("/datasets/patchData/:id", partialupdate)
    ).to.be.equal(300);
    done();
  });
});

describe("/DELETE/:id ", () => {
  it("It should delete the dataset by id", (done: any) => {
    let mydata = sinon.stub(app, "delete");
    mydata.withArgs("/datasets/deleteData/abc123", removeDataSet).returns(200);
    expect(
      app.delete("/datasets/deleteData/abc123", removeDataSet)
    ).to.be.equal(200);
    done();
  });
});


describe(" without stub", () => {
  it("No data to post", (done: any) => {
    chai
      .request(app)
      .post("/datasets/addData")
      .end((err: any, res: any) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it("Invalid datatype", function (done: any) {
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
        res.body.should.be.a('object');
        // res.body.length.should.be.eql(0);
        done();
      });
  });
  it("Does not Update a particular dataset", function (done: any) {
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
          .end((err: any, res: any) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
          });
      });
      it("Invalid route", (done: any) => {
        chai
          .request(app)
          .get("/datasets/")
          .end((err: any, res: any) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            // res.body.length.should.be.eql(0);
            done();
          });
      });
});

*/
// describe("/GET ", () => {
//   it("It should display the datasets", (done: any) => {
//     let data = {
//       id: "d31",
//       data_schema: {
//           name: "name5",
//           age: 13
//       },
//       router_config: {
//           name: "user2",
//           method: "Put"
//       },
//       status: "ACTIVE",
//       created_by: "cloud2",
//       updated_by: "user3"
//   }
//     // expect(app.get("/datasets/get"))
//     chai
//       .request(app)
//       .get("/datasets/get")
//       .end((err: any, res: any) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         res.headers["content-type"].should.contains("application/json");
//         // res.body.length.should.be.eql(0);
//         done();
//       });
//   });
//   it("Invalid route", (done: any) => {
//     chai
//       .request(app)
//       .get("/datasets/")
//       .end((err: any, res: any) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         // res.body.length.should.be.eql(0);
//         done();
//       });
//   });
// });
// describe("59624370", () => {
//   afterEach(() => {
//     sinon.restore();
//   });
//   it("should pass", async () => {
//     const mPool = { query: sinon.stub().resolves({ rows: [] }) };
//     const poolStub = sinon.stub(pg, "Pool").callsFake(() => mPool);
//     // const { DbAccess } = require(app);
//     const db = app();
//     let data = {
//       id: "d31",
//       data_schema: {
//           name: "name5",
//           age: 13
//       },
//       router_config: {
//           name: "user2",
//           method: "Put"
//       },
//       status: "ACTIVE",
//       created_by: "cloud2",
//       updated_by: "user3"
//   }
//     const actual = await db.saveConsumer(data);
//     expect(actual).to.be.eql({ rows: [] });
//     sinon.assert.calledOnce(poolStub);
//     sinon.assert.calledOnce(mPool.query);
//   });
// });
// // describe("/GET route invalid", () => {
// // });
// describe("/GET/:id ", () => {
//   it("It should display the datasets by id", (done: any) => {
//     let data = {
//       id: "d24",
//       // data_schema: {
//       //     name: "name5",
//       //     age: 13
//       // },
//       // router_config: {
//       //     name: "user2",
//       //     method: "Put"
//       // },
//       status: "ACTIVE",
//       created_by: "cloud2",
//       updated_by: "user3"
//   }
//   let expecteddata={
//     id:data.id,
//     // data_schema:data.data_schema,
//     // router_config:data.router_config,
//     status:data.status,
//     createdby:data.created_by,
//     updated_by:data.updated_by
//   }
//   expect(expecteddata).to.be.equal(data);
//   done();
//   });
// });
//     // chai
//     //   .request(app)
//     //   .get("/datasets/id/d24")
//     //   .end((err: any, res: any) => {
//     //     res.should.have.status(200);
//     //     res.body.should.be.a('array');
//     //     // res.body.length.should.be.eql(0);
//     //     res.headers["content-type"].should.contains("application/json");
//     //     done();
//     //   });
//   });
//   it("Invalid id", (done: any) => {
//     chai
//       .request(app)
//       .get("/datasets/id/p01")
//       .end((err: any, res: any) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         done();describe("/GET/:id ", () => {
//   it("It should display the datasets by id", (done: any) => {
//     let data = {
//       id: "d24",
//       // data_schema: {
//       //     name: "name5",
//       //     age: 13
//       // },
//       // router_config: {
//       //     name: "user2",
//       //     method: "Put"
//       // },
//       status: "ACTIVE",
//       created_by: "cloud2",
//       updated_by: "user3"
//   }
//   let expecteddata={
//     id:data.id,
//     // data_schema:data.data_schema,
//     // router_config:data.router_config,
//     status:data.status,
//     createdby:data.created_by,
//     updated_by:data.updated_by
//   }
//   expect(expecteddata).to.be.equal(data);
//   done();
//   });
// });
//       });
//   });
// });
// // describe("/GET/:id id does not exist", () => {
// // });
// describe('/POST add datasets', () => {
//   it('It should insert datasets', (done:any) => {
//     let data = {
//       id: "d31",
//       // data_schema: {
//       //     name: "name5",
//       //     age: 13
//       // },
//       // router_config: {
//       //     name: "user2",
//       //     method: "Put"
//       // },
//       status: "ACTIVE",
//       created_by: "cloud2",
//       updated_by: "user3"
//   }
//   // let expecteddata={
//   //   id:data.id,
//   //   // data_schema:data.data_schema,
//   //   // router_config:data.router_config,
//   //   status:data.status,
//   //   createdby:data.created_by,
//   //   updated_by:data.updated_by
//   // }
//   let database=sinon.mock(pg);
//   database.expects(data);
//   // expectation.exactly(1);
//   chai.request(app)
//         .post('/datasets/addData')
//         .end(() => {});
//   database.verify();
//   });
// });
// describe("/POST", () => {
//   it("Invalid datatype", (done: any) => {
//     let data = {
//       id: 45,
//       data_schema: {
//         name: "name5",
//         age: 13,
//       },
//       router_config: {
//         name: "user2",
//         method: "Put",
//       },
//       status: "Accepted",
//       created_by: "cloud2",
//       updated_by: "user3",
//     };
//     chai
//       .request(app)
//       .post("/datasets/addData")
//       .send(data)
//       .end((err: any, res: any) => {
//         res.should.have.status(422);
//         res.body.should.be.a('object');
//         done();
//       });
//   });
//   it("Check for primary key", (done: any) => {
//     let data = {
//       id: "d30",
//       data_schema: {
//         name: "name5",
//         age: 13,
//       },
//       router_config: {
//         name: "user2",
//         method: "Put",
//       },
//       status: "Accepted",
//       created_by: "cloud2",
//       updated_by: "user3",
//     };
//     chai
//       .request(app)
//       .post("/datasets/addData")
//       .send(data)
//       .end((err: any, res: any) => {
//         res.should.have.status(409);
//         res.body.should.be.a('object');
//         done();
//       });
//   });
//   it("No data to post", (done: any) => {
//     chai
//       .request(app)
//       .post("/datasets/addData")
//       .end((err: any, res: any) => {
//         res.should.have.status(400);
//         res.body.should.be.a('object');
//         done();
//       });
//   });
// });
// // describe("/POST primary key voilation", () => {
// // });
// // describe("/POST id missing", () => {
// // });
// describe("/PUT/:id ", function () {
//   it("Updates a particular dataset", function (done: any) {
//     let data = {
//       data_schema: {
//         name: "name5",
//         age: 13,
//       },
//       router_config: {
//         name: "user3",
//         method: "Put",
//       },
//       status: "Accepted",
//       created_by: "cloud2",
//       updated_by: "user3",
//     };
//     chai
//       .request(app)
//       .put("/datasets/updateData/140")
//       .send(data)
//       .end((err: any, res: any) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         done();
//       });
//   });
//   it("Invalid datatype", function (done: any) {
//     let data = {
//       data_schema: {
//         name: "name5",
//         age: 13,
//       },
//       router_config: "yo",
//       status: "Accepted",
//       created_by: "cloud2",
//       updated_by: "user3",
//     };
//     chai
//       .request(app)
//       .put("/datasets/updateData/140")
//       .send(data)
//       .end((err: any, res: any) => {
//         res.should.have.status(422);
//         res.body.should.be.a('object');
//         // res.body.length.should.be.eql(0);
//         done();
//       });
//   });
//   it("Key does not exist", function (done: any) {
//     let data = {
//       data_schema: {
//         name: "name5",
//         age: 13,
//       },
//       router_config: {
//         name: "user3",
//         method: "Put",
//       },
//       status: "Accepted",
//       created_by: "cloud2",
//       updated_by: "user3",
//     };
//     chai
//       .request(app)
//       .put("/datasets/updateData/abcdefgh")
//       .send(data)
//       .end((err: any, res: any) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         // res.body.length.should.be.eql(0);
//         done();
//       });
//   });
// });
// // describe("/PUT/:id Incorrect datatype", function () {
// // });
// // describe("/PUT/:id Id does not exist", function () {
// // });
// describe("/PATCH/:id ", function () {
//   it("Datasets updated successfully", function (done: any) {
//     let data = {
//       status: "Accepted",
//       created_by: "cloud2",
//       updated_by: "user3",
//     };
//     chai
//       .request(app)
//       .patch("/datasets/patchData/206")
//       .send(data)
//       .end((err: any, res: any) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         // res.body.length.should.be.eql(0);
//         done();
//       });
//   });
//   it("Does not Update a particular dataset", function (done: any) {
//     let data = {
//       data_schema: {
//         name: "name5",
//         age: 13,
//       },
//       router_config: "yo",
//       status: "Accepted",
//       created_by: "cloud2",
//       updated_by: "user3",
//     };
//     chai
//       .request(app)
//       .patch("/datasets/patchData/d02")
//       .send(data)
//       .end((err: any, res: any) => {
//         res.should.have.status(422);
//         res.body.should.be.a('object');
//         // res.body.length.should.be.eql(0);
//         done();
//       });
//   });
//   it("Does not Update a particular dataset", function (done: any) {
//     let data = {
//       status: "Accepted",
//       created_by: "cloud2",
//       updated_by: "user3",
//     };
//     chai
//       .request(app)
//       .put("/datasets/patchData/r01")
//       .send(data)
//       .end((err: any, res: any) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         // res.body.length.should.be.eql(0);
//         done();
//       });
//   });
// });
// // describe("/PATCH/:id Incorrect datatype", function () {
// // });
// // describe("/PATCH/:id Id does not exist", function () {
// // });
// describe('/DELETE/:id ', () => {
//   it('It should delete the dataset by id', (done:any) => {
//     chai.request(app)
//         .delete('/datasets/deleteData/d27')
//         .end((err:any, res:any) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               // res.body.length.should.be.eql(0);
//           done();
//         });
//   });
//   it("It should not delete the dataset by id", (done: any) => {
//     chai
//       .request(app)
//       .delete("/datasets/deleteData/145")
//       .end((err: any, res: any) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         // res.body.length.should.be.eql(0);
//         done();
//       });
//   });
// });
// // describe("/DELETE/:id id does not exist", () => {
// // });
//# sourceMappingURL=test.js.map