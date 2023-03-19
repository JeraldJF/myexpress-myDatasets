const request=require("supertest");
const app=require("../routes/dataSets");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
process.env.NODE_ENV = 'test';

import 'mocha';
var mocha = require('mocha')
  var describe = mocha.describe
  var it = mocha.it
  // var assert = require('chai').assert

// API tests
chai.use(chaiHttp);

describe('/GET datasets', () => {
  it('It should display the datasets', (done:any) => {
    chai.request(app)
        .get('/dataset/get')
        .end((err:any, res:any) => {
              res.should.have.status(200);
              // res.body.should.be.a('array');
              // res.body.length.should.be.eql(0);
          done();
        });
  });
});

// });
// describe("/POST add datasets", function () {
//   it("It should insert datasets", function (done:any) {
//     // Use supertest to run assertions for our API
//     chai.request(app)
//         .post('/dataset/create')
//         .end((err:any, res:any) => {
//               res.should.have.status(200);
//               // res.body.should.be.a('array');
//               // res.body.length.should.be.eql(0);
//           done();
//         });
//   });
// });

describe('/POST add datasets', () => {
  it('It should insert datasets', (done:any) => {
      let book = {
          id: 70,
          data_schema: {
              name: "name5",
              age: 13
          },
          router_config: {
              name: "user2",
              method: "Put"
          },
          status: "Accepted",
          created_by: "cloud2",
          updated_by: "user3"
      }
    chai.request(app)
        .post('/dataset/create')
        .send(book)
        .end((err:any, res:any) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              // res.body.should.have.property('errors');
              // res.body.errors.should.have.property('pages');
              // res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
  });

});
// });


// describe("GET /tasks", function () {
//   it("List all tasks", function (done:any) {
//     request(app).get("/dataset/get").expect(200, done);
//   });
// });
// describe("GET /tasks/:id", function () {
//   it("Gets a particular task", function (done:any) {
//     chai.request(app)
//         .get('/dataset/getById')
//         .end((err:any, res:any) => {
//               res.should.have.status(200);
//               // res.body.should.be.a('array');
//               // res.body.length.should.be.eql(0);
//           done();
//         });
//   });
// });
// describe("PUT /tasks/:id", function () {
//   it("Updates a particular task", function (done:any) {
//     request(app).put("/dataset/updateData").send({ title: "Updated task" }).expect(200, done);
//   });
// });
// describe("DELETE /tasks/:id", function () {
//   it("Deletes a particular task", function (done:any) {
//     request(app).delete("/dataset/removeData").expect(200, done);
//   });
// });
