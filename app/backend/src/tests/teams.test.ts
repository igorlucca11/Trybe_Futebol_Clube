import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import Team from '../database/models/TeamModel'
import TeamMock from './sequeelize.mock';
import { dataBase } from './sequeelize.mock';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the endpoint /teams', async () => {

  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon.stub(Team, 'findAll')
    .resolves(TeamMock.findAll())
    sinon.stub(Team, 'findByPk')
    .resolves(TeamMock.findById(2))
  })

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
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