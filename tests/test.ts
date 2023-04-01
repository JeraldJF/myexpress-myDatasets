var chai = require("chai");
var chaiHttp = require("chai-http");
import { expect, should } from "chai";
import app from "../app";
import * as db from "../helpers/testCon";

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
      .request(app)
      .get("/datasets/get")
      .end((err: any, response: any) => {
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
      .request(app)
      .get("/datasets/get")
      .end((err: any, response: any) => {
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
      .request(app)
      .get("/datasets/id/128")
      .end((err: any, response: any) => {
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
      .request(app)
      .get("/datasets/id/56")
      .end((err: any, response: any) => {
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
      .request(app)
      .post("/datasets/addData")
      .end((err: any, response: any) => {
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
      .request(app)
      .get("/datasets/id/45")
      .end((err: any, response: any) => {
        // console.log(response);
        if (response.status == 404) {
          chai
            .request(app)
            .post("/datasets/addData")
            .end((err: any, response: any) => {
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
  it("datatype Invalid", (done: any) => {
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
  it("should DELETE datasets of given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 1 };
    });

    chai
      .request(app)
      .delete("/datasets/deleteData/db01")
      .end((err: any, response: any) => {
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
      .request(app)
      .delete("/datasets/deleteData/db01")
      .end((err: any, response: any) => {
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
      .request(app)
      .put("/datasets/updateData/35")
      .end((err: any, response: any) => {
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
      .request(app)
      .put("/datasets/updateData/35")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(404);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        chai.spy.restore(db.pool, "query");
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

describe("/PARTIAL_UPDATE:ID", () => {
  // it("should PATCH UPDATE datasets of given id", (done) => {
  //   chai.spy.on(db.pool, "query", () => {
  //     return { rowCount: 1 };
  //   });

  //   chai
  //     .request(app)
  //     .get("/datasets/id/46")
  //     .end((err:any,response:any)=>{
  //       // console.log(response);
  //       if(response.status==404){
  //         chai
  //         .request(app)
  //         .patch("/datasets/patchData/76")
  //         .end((err: any, response: any) => {
  //           // console.log(response.body);

  //           response.should.have.status(200);
  //           response.body.should.be.an("object");
  //           // expect(response.body).to.be.an("array")
  //           // response.body.length.should.be.eql(0);
  //           chai.spy.restore(db.pool, "query");
  //           done();
  //         });
  //       }

  //     })
  // });
  it("should not PATCH UPDATE datasets with given id", (done) => {
    chai.spy.on(db.pool, "query", () => {
      return { rowCount: 0 };
    });

    chai
      .request(app)
      .patch("/datasets/patchData/56")
      .end((err: any, response: any) => {
        // console.log(response.body);

        response.should.have.status(404);
        response.body.should.be.an("object");
        // expect(response.body).to.be.an("array")
        // response.body.length.should.be.eql(0);
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
  it("invalid datatype to patch", function (done: any) {
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
            .request(app)
            .patch("/datasets/patchData/d02")
            .send(data)
            .end((err: any, res: any) => {
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
        chai.spy.restore(db.pool, "query");
        done();
      });
  });
});

//   it('should not GET datasets with given id', (done) => {
//     chai.spy.on(db.pool, 'query', () => {
//         return { rowCount:0}
//     })

//     chai.request(app)
//         .get('/datasets/id/56')
//         .end((err: any, response: any) => {
//           // console.log(response.body);

//             response.should.have.status(404);
//             response.body.should.be.an('object');
//             // expect(response.body).to.be.an("array")
//             // response.body.length.should.be.eql(0);
//             chai.spy.restore(db.pool, 'query')
//             done();
//         })
// })
// });

// describe('get records by id', () => {
//     it('should GET the records by id', (done) => {
//         chai.spy.on(dataset2.pool, 'query', () => {
//             return { "rows": [{}] }
//         })

//         chai.request(app)
//             .get('/dataset1/get/100')
//             .end((err: any, response: any) => {
//                 response.should.have.status(200);
//                 response.body.should.be.a('array');
//                 response.body.length.should.not.be.eql(0);
//                 chai.spy.restore(dataset2.pool, 'query')
//                 done();
//             })
//     })
//     it('records not found', (done) => {
//         chai.spy.on(dataset2.pool, 'query', () => {
//             return { "rowsCount":0 }
//         })
//         chai.request(app)
//             .get('/dataset1/get/200')
//             .end((err: any, response: any) => {
//                 response.should.have.status(404);
//                 response.body.should.not.be.a('array');
//                 //response.body.length.should.be.eql(0);
//                 chai.spy.restore(dataset2.pool, 'query')
//                 done();
//             })
//     })
// });
// describe('create records', () => {
//     it('insert the records', (done) => {
//         chai.spy.on(pool, 'query', () => {
//             return { "rows": [{}] }
//         })

//         chai.request(app)
//             .post('/datasets/addData')
//             .end((err: any, response: any) => {
//                 response.should.have.status(200);
//                 response.body.should.be.a('array');
//                 response.body.length.should.not.be.eql(0);
//                 chai.spy.restore(pool, 'query')
//                 done();
//             })
//     })
// })

// // import * as db from "../helpers/testCon";
// import pool from "../helpers/testCon";

// var chai = require("chai");
// var chaiHttp = require("chai-http");
// import app from "../app";
// var spies = require("chai-spies");
// chai.use(spies);
// chai.use(chaiHttp);
// chai.should();
// var chaiHttp = require("chai-http");
// var expect = chai.expect;

// describe("get records", () => {
//   it("should GET all the records", (done) => {
//     chai.spy.on(pool, "SELECT * FROM datasets", (err: any, result: any) => {});
//     chai
//       .request(app)
//       .get("/datasets/get")
//       .end((err: any, response: any) => {
//         // console.log(response.body);
//         if(err){

//         }
//         response.should.have.status(200);
//         response.body.should.be.a("array");
//         response.body.length.should.not.be.eql(0);
//         // chai.spy.restore()
//         done();
//       });
//   });

//   it("should give 204 for empty table", (done)=>{
//       chai
//       .request(app)
//       .get("/datasets/ge")
//       .end((err: any, response: any) => {
//         if(err){
//             response.should.have.status(0)
//         }

//         //   response.should.have.status(400)
//           done();
//         });

//     })
// });

/*


import chai from 'chai';
const expect = chai.expect;
const sinon = require('sinon');
// const request = require('supertest');
import "mocha";
// import { should } from "mocha";


var spies = require("chai-spies");
// const app = require("../app");
const request = require("request");

// const faker = require("faker");

// let chaiHttp = require("chai-http");
chai.should();

// let expect = chai.expect;

var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
const app = require('../helpers/testCon');
const app1=require("../app");
import pool from "../helpers/connection";
import chaiHttp from "chai-http";
// chai.should();
// var expect = chai.expect;
chai.use(chaiHttp);

// console.log(pool);
describe('GET /data', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a list of datasets', (done:any) => {
    const fakeData = [
      { id: "d22",
              data_schema: {
                name: "name5",
                age: 245,
              },
              router_config: {
                name: "user3",
                method: "Put",
              },
              status: "Accepted",
              created_by: "cloud2",
              updated_by: "user3" },
      { id: "d22",
      data_schema: {
        name: "name5",
        age: 245,
      },
      router_config: {
        name: "user3",
        method: "Put",
      },
      status: "Accepted",
      created_by: "cloud2",
      updated_by: "user3" },
    ];
    // const poolQueryStub = sinon.stub(pool, 'query').yields(null, { rows: fakeData });
    // pool.query("SELECT * FROM datasets;")
    sinon.stub(pool,'connect');
    const poolQueryStub = sinon.stub(pool,"query").callsFake((query:any, callback:any) => {
      const data = {
        rowCount: 1,
        rows: [
          {
            id: "d22",
            data_schema: {
              name: "name5",
              age: 245,
            },
            router_config: {
              name: "user3",
              method: "Put",
            },
            status: "Accepted",
            created_by: "cloud2",
            updated_by: "user3",
          },
        ],
      };
      callback(null,data);
    });

    request(app)
      .get('/datasets/get')
      .expect(200)
      .end((err:any, res:any) => {
        if (err) return done(err);

        expect(res.body).to.deep.equal(fakeData);
        // expect(poolQueryStub.calledOnce).to.be.true;
        // expect(poolQueryStub.firstCall.args[0]).to.equal('SELECT * FROM datasets;');

        done();
      });
  });
  describe("Client side api testing", () => {
    it("Invalid route", (done: any) => {
      chai
        .request(app1)
        .get("/datasets/")
        .end((err: any, res: any) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          // res.body.length.should.be.eql(0);
          done();
        });
    });
    it("No data to post", (done: any) => {
      chai
        .request(app1)
        .post("/datasets/addData")
        .end((err: any, res: any) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
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
        .request(app1)
        .put("/datasets/updateData/140")
        .send(data)
        .end((err: any, res: any) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          // res.body.length.should.be.eql(0);
          done();
        });
    });
    it("invalid datatype to patch", function (done: any) {
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
        .request(app1)
        .patch("/datasets/patchData/d02")
        .send(data)
        .end((err: any, res: any) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          // res.body.length.should.be.eql(0);
          done();
        });
    });
  });


*/

// it('error if there is a problem with the database', (done) => {
//   const poolQueryStub = sinon.stub(pool, 'query').yields(new Error('Database error'));

//   request(app)
//     .get('/datasets/get')
//     .expect(500)
//     .end((err:any, res:any) => {
//       if (err) return done(err);

//       expect(res.body).to.deep.equal({ error: 'Database error' });
//       expect(poolQueryStub.calledOnce).to.be.true;
//       expect(poolQueryStub.firstCall.args[0]).to.equal('SELECT * FROM datasets;');

//       done();
//     });
// });
// });

/*



const chai = require("chai");

// const chaiSpies = require("chai-spies");

var spies = require("chai-spies");

chai.use(spies);
import { request } from "chai";
import chaiHttp from "chai-http";
chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
// chai.use(chaiSpies);
import poolModule from "../helpers/connection";

import express from "express";

// chai.use(chaiHttp);
// chai.use(chaiSpies);

// const app = express();
// const app = require("../helpers/testCon");
const app = chai.request.agent('http://localhost:3006');
// const port = 3006;

import pool from "../helpers/connection";

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "myapp",
//   password: "password",
//   port: 5432,
// });

describe("Database independent", () => {
  const mockQuery = chai.spy((query: any, callback: any) => {
    const data = {
      rowCount: 1,
      rows: [
        {
          id: "d22",
          data_schema: {
            name: "name5",
            age: 245,
          },
          router_config: {
            name: "user3",
            method: "Put",
          },
          status: "Accepted",
          created_by: "cloud2",
          updated_by: "user3",
        },
      ],
    };
    callback(null, data);
  });
  before(() => {
    chai.spy.on(pool, "query", mockQuery);
  });
  after(() => {
    chai.spy.restore();
  });
  it("get", (done: any) => {
  request(app)
      .get("/datasets/get")
      .end((err: any, res: any) => {
        res.should.have.status(200);
        // res.body.should.be.an("array");
        // res.body[0].should.have.property("id");
        // res.body[3].should.have.property("status");
        chai.spy.restore(pool, "query");
        expect(mockQuery.firstCall.args[0]).to.equal('id');
        done();
      });
  });
  it("post", (done: any) => {
    request(app)
      .post("/datasets/add")
      .end((err: any, res: any) => {
        res.should.have.status(200);
        // res.body.should.be.an("array");
        // res.body[0].should.have.property("id");
        // res.body[3].should.have.property("status");
        chai.spy.restore(pool, "query");
        // expect(mockQuery.firstCall.args[0]).to.equal('id');
        done();
      });
  });
});

*/

// chai.spy.on(pool, 'query', () => {
//   return {
//     rowCount: 1,
//     rows: [
//       {
//         id: "d22",
//         data_schema: {
//           name: "name5",
//           age: 245,
//         },
//         router_config: {
//           name: "user3",
//           method: "Put",
//         },
//         status: "Accepted",
//         created_by: "cloud2",
//         updated_by: "user3",
//       }
//     ]
//   }});

// });

// import chaiHttp from 'chai-http';
// import connectDB from '../routes/getDataSet';
// const chai = require('chai')
// chai.use(chaiHttp);
// const chaiSpies = require("chai-spies");

// var spies = require('chai-spies');

// chai.use(spies);

// // const should = chai.should()
// var expect = chai.expect;
// chai.use(chaiHttp);
// chai.use(chaiSpies);

// const app = chai.request.agent('http://localhost:3000');

// describe('ConnectDB', () => {
//   it('should return data if the table is not empty', async () => {
//     const mockReq = {};
//     const mockRes = {
//       send: chai.spy(),
//       status: chai.spy(() => mockRes),
//       json: chai.spy(() => mockRes)
//     };
//     const mockQuery = chai.spy((query: any, callback: any) => {
//       const data = {
//         rowCount: 1,
//         rows: [{ id:"d22",
//         data_schema: {
//                 name: "name5",
//                 age: 245,
//               },
//               router_config: {
//                 name: "user3",
//                 method: "Put",
//               },
//               status: "Accepted",
//               created_by: "cloud2",
//               updated_by: "user3" }]
//       };
//       callback(null, data);
//     });

//     const mockPool = {
//       query: mockQuery,
//       end: chai.spy()
//     };
//     const mockConnection = chai.spy(() => mockPool);
//     const poolModule = require('../helpers/connection');
//     poolModule.default = mockConnection;

//     await connectDB(mockReq, mockRes);

//     expect(mockRes.status).to.have.been.called.with(200);
//     // expect(mockRes.send).to.have.been.called.with([{ name: 'Dataset 1' }]);
//     expect(mockPool.query).to.have.been.called();
//     expect(mockPool.end).to.have.been.called();
//   });

//   it('should return error message if the table is empty', async () => {
//     const mockReq = {};
//     const mockRes = {
//       send: chai.spy(),
//       status: chai.spy(() => mockRes),
//       json: chai.spy(() => mockRes)
//     };
//     const mockQuery = chai.spy((query: any, callback: any) => {
//       const data = {
//         rowCount: 0,
//         rows: []
//       };
//       callback(null, data);
//     });

//     const mockPool = {
//       query: mockQuery,
//       end: chai.spy()
//     };
//     const mockConnection = chai.spy(() => mockPool);
//     const poolModule = require('../helpers/connection');
//     poolModule.default = mockConnection;

//     await connectDB(mockReq, mockRes);

//     expect(mockRes.status).to.have.been.called.with(404);
//     expect(mockRes.json).to.have.been.called.with({
//       status: 'ERROR',
//       message: 'Table is empty'
//     });
//     expect(mockPool.query).to.have.been.called();
//     expect(mockPool.end).to.have.been.called();
//   });
// });
//   // it('should return error message if there is a database error', async () => {
//   //   const mockReq = {};
//   //   const mockRes = {
//   //     send: chai.spy(),
//   //     status: chai.spy(() => mockRes),
//   //     json: chai.spy(() => mockRes)
//   //   };
//   //   const mockError = new Error('Database error');

//   //   const mockQuery = chai.spy((query: any, callback: any) => {
//   //     callback(mockError);
//   //   });

//   //   const mockPool = {
//   //     query: mockQuery,
//   //     end: chai.spy()
//   //   };
//   //   const mockConnection = chai.spy(() => mockPool);
//   //   const poolModule = require('../src/helpers/connection');
//   //   poolModule.default = mockConnection;

//   //   await connectDB(mockReq, mockRes);

//   //   expect(mockRes.status).to.have.been.called.with(500);
//   //   expect(mockRes.json).to.have.been.called

/*


// import { should } from "chai";
import "mocha";
// import { should } from "mocha";
import pool from "../helpers/testCon";
let chai = require("chai");
var spies = require("chai-spies");
const app = require("../app");
const request = require("request");

// const faker = require("faker");

let chaiHttp = require("chai-http");
chai.should();

let expect = chai.expect;

var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
// var assert = chai.assert;

// API tests
chai.use(chaiHttp);
// const returnTrue = chai.spy.returns(true);

chai.use(spies);
// const chaispy = chai.spy.interface(['on', 'off', 'emit']);

describe("Testing", () => {
  describe("Client side api testing", () => {
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
          res.body.should.be.a('object');
          // res.body.length.should.be.eql(0);
          done();
        });
    });
    it("invalid datatype to patch", function (done: any) {
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
  });
  // it("get", () => {
  //   // chai.spy.on(pool, "query", () =>);
  //   const data = chai.spy.interface({});
  //   chai
  //     .request(app)
  //     .get("/datasets/get")
  //     .end((err: any, res: any) => {
  //       // res.should.have.status(404);
  //       // res.body.should.be.a("object");
  //       // res.body.length.should.be.eql(0);
  //       // done();
  //     });
  // });
  describe("Database dependent",()=>{
  it("get", () => {
    const returnTrue = chai.spy.returns(
      chai
        .request(app)
        .get("/datasets/get")
        .end((err: any, res: any) => {
          res.should.have.status(200);
        })
    );
    returnTrue();
  });
  // it("delete", () => {
  //   const returnTrue = chai.spy.returns(
  //     chai
  //       .request(app)
  //       .delete("/datasets/deleteData/d25")
  //       .end((err: any, res: any) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //       })
  //   );
  //   returnTrue();
  // });

  // it("delete mock", () => {
  //   let d:any;
  //   const mocked=chai.spy.interface(
  //     d=()=>{
  //       let data={
  //         id:"d22",
  //         data_schema: {
  //                 name: "name5",
  //                 age: 245,
  //               },
  //               router_config: {
  //                 name: "user3",
  //                 method: "Put",
  //               },
  //               status: "Accepted",
  //               created_by: "cloud2",
  //               updated_by: "user3"
  //       }
  //     chai
  //     .request(app)
  //       .delete("/datasets/deleteData/d24")
  //       .send(data)
  //       .end((err: any, res: any) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //       })
  // });
  //     mocked();
  // });
  it("get", () => {
    chai.spy.on(pool, 'query', (returns: any) => 200);
    chai
      .request(pool)
      .delete("/datasets/deleteData/145")
      .end((err: any, res: any) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        // res.body.length.should.be.eql(0);
      })
  });


  // it("not delete", () => {
  //   const a={

  //   }
  //   const returnTrue = chai.spy.returns(
  //     chai
  //       .request(app)
  //       .delete("/datasets/deleteData/145")
  //       .end((err: any, res: any) => {
  //         res.should.have.status(404);
  //         res.body.should.be.a("object");
  //         // res.body.length.should.be.eql(0);
  //       })
  //   );
  //   returnTrue();
  // });
  // it("patch",()=>{
  //   let data = {
  //     data_schema: {
  //       name: "name5",
  //       age: 245,
  //     },
  //     router_config: {
  //       name: "user3",
  //       method: "Put",
  //     },
  //     status: "Accepted",
  //     created_by: "cloud2",
  //     updated_by: "user3",
  //   };
  //   const returnTrue = chai.spy.returns(
  //         chai
  //           .request(app)
  //           .put("/datasets/updateData/d28")
  //           .send(data)
  //           .end((err: any, res: any) => {
  //             res.should.have.status(200);
  //             res.body.should.be.a('object');
  //           }));
  //           returnTrue();
  // });
});
});

*/

/*
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon')
import { SinonStub } from 'sinon';
const app= require('../public/typescripts/getDataSet');
import * as queries from '../Config/queries';

chai.use(chaiHttp);
var expect = chai.expect;

  describe('getAllUsers', () => {
    it('should retrieve all users', async () => {
      const findAllMock = sinon.mock(app,'');
      const records = [{
        id: "107",
        data_schema: {
            name: "John",
            age: 20
        },
        router_config: {
            name: "pc",
            method:"post"

        },
        status: "Active",
        created_by: "System",
        updated_by: "MyPC"  },
        {
          id: "108",
          data_schema: {
              name: "Johnny",
              age: 21
          },
          router_config: {
              name: "pc",
              method:"post"

          },
          status: "Active",
          created_by: "System",
          updated_by: "MyPC"  }];

      findAllMock.expects('get').once().resolves(records);

      const result = app.;

      expect(result).to.deep.equal(records);
      console.log(expect(result).to.deep.equal(records));

      findAllMock.verify();
      findAllMock.restore();
    });
  });

*/

/*

var chai = require('chai');
var chaiHttp = require('chai-http');
const assert = require('assert');
// const pgmem = require('pg-mem');
const request = require('request');
import { newDb } from "pg-mem";
var app=require("../routes/server");

chai.use(chaiHttp);

describe('GET /users', function() {
  let db:any;

  before(function() {
    // create a new in-memory database instance
    db = newDb();

    // create a 'users' table with sample data
    const create=db.public.none(`
      CREATE TABLE datasets (
        id TEXT PRIMARY KEY,
        data_schema json,
        router_config json,
        status varchar(20),
        created_by varchar(20),
        updated_by varchar(20),
        created_date timestamp,
        updated_date timestamp
      )
    `);

   const add= db.public.none(`
      INSERT INTO datasets (id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) VALUES('320','{"name":"vivy","age":"20"}','{"name":"Login","method":"Post"}','Null','myP1','Docs1','2023-03-27 14:49:47','2023-03-27 14:49:47');`);
  });

  // after(function() {
  //   db.close();
  // });

  it('should return a list of all users', async function() {
    const expected = [
      { id: "d31",
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
            updated_by: "user3",
          created_date: "2023-03-27 14:49:47"
          }
    ];
    const res = {
      status: function(code:any) {
        assert.equal(code, 200);
        return this;
      },
      json: function(data:any) {
        assert.deepStrictEqual(data, { status: 'SUCCESS', message: 'Data inserted successfully' });
      }
    };
    chai.request(app).get("/datasets/get").end((res:any)=>{
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.body, expected);
    }
    );
  });
});



*/

/*

const assert = require('assert');
const sinon = require('sinon');
const { connectDb } = require('../public/typescripts/getDataSet');
const pool = require('../Config/Connection');

describe('connectDb', function() {
  it('should return inserted message on successful insert', function(done) {
    const req = {
      body: {
        id: '1',
        data_schema: {},
        router_config: {},
        status: 'active',
        created_by: 'user1',
        updated_by: 'user1'
      }
    };
    const res = {
      status: function(code:any) {
        assert.equal(code, 200);
        return this;
      },
      json: function(data:any) {
        assert.deepStrictEqual(data, { status: 'SUCCESS', message: 'Data inserted successfully' });
        done();
      }
    };
    const mockPool = sinon.mock(pool);
    mockPool.expects('query').once().callsArgWith(1, null, { rowCount: 0 });
    connectDb(req, res);
    mockPool.verify();
  });

  it('should return nodatasets message when id is not provided', function(done) {
    const req = {
      body: {}
    };
    const res = {
      status: function(code:any) {
        assert.equal(code, 400);
        return this;
      },
      json: function(data:any) {
        assert.deepStrictEqual(data, { status: 'ERROR', message: 'No datasets provided to post' });
        done();
      }
    };
    connectDb(req, res);
  });

  it('should return datatypes_error when validation fails', function(done) {
    const req = {
      body: {
        id: '1',
        data_schema: { name: 123 },
        router_config: {},
        status: 'active',
        created_by: 'user1',
        updated_by: 'user1'
      }
    };
    const res = {
      status: function(code:any) {
        assert.equal(code, 422);
        return this;
      },
      json: function(data:any) {
        assert.deepStrictEqual(data, { status: 'ERROR', message: 'Invalid datatype provided' });
        done();
      }
    };
    connectDb(req, res);
  });

  it('should return dberror message when database query fails', function(done) {
    const req = {
      body: {
        id: '1',
        data_schema: {},
        router_config: {},
        status: 'active',
        created_by: 'user1',
        updated_by: 'user1'
      }
    };
    const res = {
      status: function(code:any) {
        assert.equal(code, 500);
        return this;
      },
      json: function(data:any) {
        assert.deepStrictEqual(data, { status: 'ERROR', message: 'Cannot add datasets' });
        done();
      }
    };
    const mockPool = sinon.mock(pool);
    mockPool.expects('query').once().callsArgWith(1, new Error());
    connectDb(req, res);
    mockPool.verify();
  });

  // it('should return primary key violation message when id already exists', function(done) {
  //   const req = {
  //     body: {
  //       id: '1',
  //       data_schema: {},
  //       router_config: {},
  //       status: 'active',
  //       created_by: 'user1',
  //       updated_by: 'user1'
  //     }
  //   };
  //   const res = {
  //     status: function(code) {
  //       assert.equal(code, 409);
  //       return this;
  //     },
  //     json:
});

*/

/*


// process.env.NODE_ENV = 'test';
import "mocha";
const { create } = require('pg-mem');

// Create an instance of pg-mem
const pg = create;
const sinon = require('sinon');
// const request = require("../helpers/testCon");
const request = require('request');
let chai = require("chai");
const should = chai.should();
// const app=require();
const base = 'http://localhost:3006';


  describe('when stubbed', () => {
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
        ]
      };
      beforeEach(() => {
        let get1 = sinon.stub(request, 'get');
      });

      afterEach(() => {
        request.get1.restore();
      });
      describe('GET', () => {
        it('should return data', (done) => {
          request.get.yields(null, responseObject, JSON.stringify(responseBody));
          request.get1(`/datasets/get`, (err:any, res:any, body:any) => {
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


*/

/*

  describe('GET/:id', () => {
    it('should respond with a single data', (done) => {
      request.get(`${base}/api/v1/movies/4`, (err:any, res:any, body:any) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'name', 'genre', 'rating', 'explicit'
        );
        body.data[0].name.should.eql('The Land Before Time');
        done();
      });
    });
  });

// });









// /api/v1/movies`


*/

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
const app = require("../routes/server");
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
    const responseBody = {
      status: 'success',
      rows: [
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
      ]
    };
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


// describe(" without stub", () => {
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
//   it("Does not Update a particular dataset", function (done: any) {
//         let data = {
//           data_schema: {
//             name: "name5",
//             age: 13,
//           },
//           router_config: "yo",
//           status: "Accepted",
//           created_by: "cloud2",
//           updated_by: "user3",
//         };
//         chai
//           .request(app)
//           .patch("/datasets/patchData/d02")
//           .send(data)
//           .end((err: any, res: any) => {
//             res.should.have.status(422);
//             res.body.should.be.a('object');
//             // res.body.length.should.be.eql(0);
//             done();
//           });
//       });
//       it("Invalid route", (done: any) => {
//         chai
//           .request(app)
//           .get("/datasets/")
//           .end((err: any, res: any) => {
//             res.should.have.status(404);
//             res.body.should.be.a("object");
//             // res.body.length.should.be.eql(0);
//             done();
//           });
//       });
// });


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
