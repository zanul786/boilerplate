const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const EmailService = require("../server/services/email");
var assert = chai.assert;
const server = require('../server/index');
const jwt  = require('jsonwebtoken');
const {
    db
} = require('../server/db');

const should = chai.should();
chai.use(chaiHttp);


describe('forgotpassword API Tests', function () {

    describe('POST /forgotpassword', function () {
        it('should send email',  function (done) {
            try {
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
                }
                catch (err) {
                    done(err);
                }
            }).timeout(10000);  
    });

    describe('POST /resetpassword', function () {
        it('should  verify  token',  function (done) {
            try {
                var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),email_id:'sanjaynextpage@gmail.com'},  'i am a tea pot');
                chai.request('http://localhost:8000')
                    .get('/api/password/resetpassword/'+token)
                    .end(function (err, res) {
                        if (err){
                            done(err);
                        }
                        assert.equal(res.body.name, undefined);
                        done()
                    })
                }
                catch (err) {
                    done(err);
                }
        }); 
        it('should not verify  token',  function (done) {
            try {
                var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),email_id:'sanjaynextpage@gmail.com'},  'i am a tea po');
                chai.request('http://localhost:8000')
                    .get('/api/password/resetpassword/'+token)
                    .end(function (err, res) {
                        if (err){
                            done(err);
                        }
                        
                        const response = JSON.parse(res.text)
                        assert.equal(response.name, 'JsonWebTokenError');
                        done()
                    })
                }
                catch (err) {
                    done(err);
                }
        });  
    });


    describe('POST /updatepassword', function () {
        it('should update password',  function (done) {
            try{
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
            }
            catch (err) {
                done(err);
            }
        });
        it('should return error for invalid email id',  function (done) {
           try{
            chai.request('http://localhost:8000')
                .post('/api/password/updatepassword')
                .send({
                        email: 'sanjayxxxxx@gmail.com',
                        password:'11111'
                })
                .end(function (err, res) {
                    if (err){
                        done(err);
                    }
                    assert.equal(res.status, 500);
                    done()
                })
            }
            catch (err){
                done(err)
            }
        });   
    });


});