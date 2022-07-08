// const assert = require('assert');
// const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHTTP);
describe ('Housing Adverts', () => {

    describe('CRUD OPERATIONS', () => {

        it('Should Fetch 10 Adverts when we use pagination', done =>{
            chai.request(server)
                .get('/?limit=10&skip=1')
                .end((err, res) => {
                    if(err){
                        console.log(err);
                    }  
                    else { 
                        res.should.have.status(200);
                        res.body.result.length.should.equal(10);
                        console.log('RESULT STATUS :', res.status);
                        console.log('RESULT LENGTH: ', res.body.result.length);
                        console.log('Fetch Data Succesfully');
                    }
                })
            done();
        });

        it('Should Fetch all Adverts when we dont use pagination', done =>{
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    if(err){
                        console.log(err);
                    }  
                    else { 
                        res.should.have.status(200);
                        res.body.result.should.have.lengthOf.at.least(0);
                        console.log('RESULT STATUS :', res.status);
                        console.log('RESULT LENGTH: ', res.body.result.length);
                        console.log('Fetch Data Succesfully');
                    }
                })
            done();
        })
    })
})