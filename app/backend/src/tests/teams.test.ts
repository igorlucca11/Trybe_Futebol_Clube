import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import Teams from '../database/models/TeamsModel'
import TeamsMock from './sequeelize.mock';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the endpoint /teams', async () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Teams, 'findAll')
    .resolves(TeamsMock.findAll())
  })
  it('Test get /teams', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.body).to.eql(TeamsMock._defaults)
})
}
)