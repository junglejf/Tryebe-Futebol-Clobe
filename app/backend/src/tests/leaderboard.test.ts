import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/leaderboard', () => {
  describe('GET/leaderboard/home', () => {
    it('é retornado um status 200', async () => {
      const res = await chai.request(app).get('/leaderboard/home')

      expect(res.status).to.be.equal(200)
    });

  })

  describe('GET/leaderboard/away ', () => {
    it('é retornado um status 200', async () => {
      const res = await chai.request(app).get('/leaderboard/away')

      expect(res.status).to.be.equal(200)
    });
    it('é retornado um status 400', async () => {
      const res = await chai.request(app).patch(`/matches/:id`).query({id: 1999})

      expect(res.status).to.be.equal(400)
    
  })
})
  describe('GET/leaderboard/ ', () => {
    it('é retornado um status 200', async () => {
      const res = await chai.request(app).get('/leaderboard/')

      expect(res.status).to.be.equal(200)
    });
    
  })
});