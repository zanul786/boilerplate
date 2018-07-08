const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const EmailService = require("../server/services/email");
var assert = chai.assert;
const server = require('../server/index');
const {
    db
} = require('../server/db');

const should = chai.should();
chai.use(chaiHttp);


describe('forgotpassword API Tests', function () {

    describe('POST /forgotpassword', function () {
        it('should send email',  function (done) {
            this.timeout(10000);
            chai.request('http://localhost:8000')
                .post('/api/password/forgotpassword')
                .send({
                        email: 'sanjaynextpage@gmail.com'
                })
                .end(function (err, res) {
                    if (err){
                        done(err);
                    }
                    assert.equal(res.status, 200);
                    done()
                })
        });  
    });
    describe('POST /updatepassword', function () {
        it('should update password',  function (done) {
            this.timeout(10000);
            chai.request('http://localhost:8000')
                .post('/api/password/updatepassword')
                .send({
                        email: 'sanjaynextpage@gmail.com',
                        password:'11111'
                })
                .end(function (err, res) {
                    if (err){
                        done(err);
                    }
                    assert.equal(res.status, 500);
                    done()
                })
        });
        it('should return error for invalid email id',  function (done) {
            this.timeout(10000);
            chai.request('http://localhost:8000')
                .post('/api/password/updatepassword')
                .send({
                        email: 'sanjaynextpage@gmail.com',
                        password:'11111'
                })
                .end(function (err, res) {
                    if (err){
                        done(err);
                    }
                    assert.equal(res.status, 500);
                    done()
                })
        });   
    });


});