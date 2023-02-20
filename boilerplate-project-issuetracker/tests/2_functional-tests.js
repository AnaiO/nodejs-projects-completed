const chaiHttp = require('chai-http');
const chai = require('chai');

const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);

suite('Functional Tests', function() {

  // beforeEach((done) => {

  //   done();
  // });

  // afterEach((done) => {
  //   done();
  // });

  test('Create an issue with every field: POST request to /api/issues/{project}', (done) => {
    chai.request(server)
      .post('/api/issues/:project')
      .type('form')
      .send({
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error.",
        "created_by": "Joe",
        "assigned_to": "Joe",
        "status_text": "In QA"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });

  test('Create an issue with only required fields: POST request to /api/issues/{project}', (done) => {
    chai.request(server)
      .post('/api/issues/:project')
      .type('form')
      .send({
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error.",
        "created_by": "Joe",
        // "assigned_to": "Joe",
        // "status_text": "In QA"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });

  test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {
    chai.request(server)
      .post('/api/issues/:project')
      .type('form')
      .send({
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error.",
        // "created_by": "Joe",
        // "assigned_to": "Joe",
        // "status_text": "In QA"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        // res.error.length
      });
    done();
  });

  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });




  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/:project')
      .send({
        "project": "apitest",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
});
