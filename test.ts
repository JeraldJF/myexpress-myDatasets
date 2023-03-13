const request=require("supertest");
const app=require("./dataSets");
import 'mocha';
var mocha = require('mocha')
  var describe = mocha.describe
  var it = mocha.it
  // var assert = require('chai').assert

// API tests
describe("POST /add-task", function () {
  it("Adds a task", function (done:any) {
    // Use supertest to run assertions for our API
    request(app).post("/dataset/create").send({ title: "API testing" }).expect(201, done);
  });
});

describe("GET /tasks", function () {
  it("List all tasks", function (done:any) {
    request(app).get("/dataset/get").expect(200, done);
  });
});
describe("GET /tasks/:id", function () {
  it("Gets a particular task", function (done:any) {
    request(app).db.get("/dataset/getById").expect(200, done);
  });
});
describe("PUT /tasks/:id", function () {
  it("Updates a particular task", function (done:any) {
    request(app).put("/dataset/updateData").send({ title: "Updated task" }).expect(200, done);
  });
});
describe("DELETE /tasks/:id", function () {
  it("Deletes a particular task", function (done:any) {
    request(app).delete("/dataset/removeData").expect(200, done);
  });
});
