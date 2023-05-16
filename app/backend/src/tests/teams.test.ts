import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import Teams from '../database/models/TeamsModel'
import TeamsMock, { dataBase } from './sequeelize.mock';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the endpoint /teams', async () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Teams, 'findAll')
    .resolves(TeamsMock.findAll())
    sinon.stub(Teams, 'findByPk')
    .resolves(TeamsMock.findById(2))
  })

  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findByPk as sinon.SinonStub).restore();
  })
  it('Test get /teams', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.body).to.eql(dataBase)
})
  it('Test get /teams/:id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/02')
    expect(chaiHttpResponse.body).to.eql(dataBase[1])
})
}
)