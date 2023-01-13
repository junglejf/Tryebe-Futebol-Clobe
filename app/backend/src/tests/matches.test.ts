import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/matches'
import { matchesMock, matchesInProgressMock } from './mocks';


chai.use(chaiHttp)

const { expect } = chai;
const PROGRESS_MATCH = 3;
describe('Matchs test  /matches', () => {

  describe('Seleciona todos as partidas', () => {
    afterEach(() => {
      sinon.restore();
    })

    it('Busca com sucesso todos as partidas da base de Dados /matches', async () => {
      sinon.stub(Matches, "findAll").resolves(matchesMock as Array<Matches>)

      const res = await chai.request(app).get('/matches')

      expect(res.status).to.be.equal(200)
      expect(res.body).to.deep.equal(matchesMock)
    })
    it('Se a base de dados não tiver partidas cadastrados retorna []', async () => {
      sinon.stub(Matches, "findAll").resolves([])
      const res = await chai.request(app).get('/matches')

      expect(res.status).to.be.equal(200)
      expect(res.body).to.be.an('array').that.is.empty
    })
  })

  describe('Seleciona partida in progress /matchesq?inProgress', () => {
    beforeEach(() => {
      sinon.stub(Matches, 'findAll').resolves(matchesInProgressMock as Array<Matches>)
    })
    afterEach(() => {
      sinon.restore();
    })
    it('retorna a partidas in progrss', async () => {

      const res = await chai.request(app).get('/matches').query({inProgress: true})

      expect(res.status).to.deep.equal(200)
      expect(res.body).to.deep.equal(matchesInProgressMock)
    })
    it('login com sucesso', async () => {
      const res = await chai.request(app).patch('/matches/40/finish').send();
  
      expect(res).to.have.status(200);
    });

  })
})