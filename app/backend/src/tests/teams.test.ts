import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/teams'
import { teamsMock } from './mocks';

chai.use(chaiHttp)

const { expect } = chai;

describe('Teams test i /team', () => {

  describe('Seleciona todos os times', () => {

    afterEach(() => {
      sinon.restore();
    })

    it('Busca com sucesso todos os times da base de Dados /teams', async () => {
      sinon.stub(Team, "findAll").resolves(teamsMock as Array<Team>)
      const res = await chai.request(app).get('/teams')

      expect(res.status).to.be.equal(200)
      expect(res.body).to.deep.equal(teamsMock)
    })
    it('Se a base de dados não tiver tiems cadastrados retorna []', async () => {
      sinon.stub(Team, "findAll").resolves([])
      const res = await chai.request(app).get('/teams')

      expect(res.status).to.be.equal(200)
      expect(res.body).to.be.an('array').that.is.empty
    })
  })

  describe('Seleciona o time especificado pelo id /teams:id', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findOne').resolves(teamsMock[0] as Team)
    })
    afterEach(() => {
      sinon.restore();
    })
    it('deve retornar 200 e o time corretamente', async () => {

      const res = await chai.request(app).get('/teams/0')

      expect(res.status).to.deep.equal(200)
      expect(res.body).to.deep.equal(teamsMock[0])
    })

  })
})