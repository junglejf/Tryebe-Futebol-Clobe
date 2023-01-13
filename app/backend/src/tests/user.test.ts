import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import  User  from '../database/models/user';
import { userMock, userBodyMock, tokenMock } from './mocks'; 
import LoginService from '../services/loginService';



chai.use(chaiHttp)

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Tests User login', () => {

  describe('/login', () => {
    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(userMock as User)
     // sinon.stub(LoginService, "validateUser").resolves()
      sinon.stub(bcrypt, "compare").resolves(true);
      sinon.stub(LoginService, "loginToken").resolves(tokenMock)

    })

    afterEach(() => {
      sinon.restore();
    })

    it('login success', async () => {
      const res = await chai.request(app).post('/login').send(userBodyMock);

      expect(res.status).to.be.equal(200);
      expect(res.body.token).to.be.equal(tokenMock);
    })

  })

  describe('/login fail', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('invalid user', async () => {
      sinon.stub(bcrypt, 'compare').resolves(false)
      const res = await chai.request(app).post('/login').send(userBodyMock);
      expect(res.status).to.be.equal(401);
    })
    it('invalid user Field', async () => {
      const res = await chai.request(app).post('/login').send(userBodyMock.email);
      expect(res.status).to.be.equal(400);
    })
  })
})
