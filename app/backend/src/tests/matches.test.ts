import * as chai from 'chai'
// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon'
import Match from '../database/models/MatchModel'
import MatchesMock, { matchesDataBase } from './matches.mock'
import { app } from '../app'
import { Response } from 'superagent';
import { INVALID_QUERY } from '../errors';

chai.use(chaiHttp)
const { expect } = chai

describe('Tests of the endpoint /matches', async () =>{
  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore()
  })
  let chaiHttpResponse: Response
  it('Tests if the endpoint get /matches returns all the matches',async () => {
    sinon.stub(Match, 'findAll').resolves(MatchesMock.findAll())
    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.body).to.be.eql(matchesDataBase)
  })
  it('Tests if the endpoint get /matches returns all the matches',async () => {
    sinon.stub(Match, 'findAll').resolves(MatchesMock.findAll())
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false')
    expect(chaiHttpResponse.body).to.be.eql(matchesDataBase)
  })
  it('Tests if the endpoint get /matches returns all the matches',async () => {
    sinon.stub(Match, 'findAll').resolves(MatchesMock.findAll())
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true')
    expect(chaiHttpResponse.body).to.be.eql(matchesDataBase)
  })
  it('Tests if the endpoint get /matches returns all the matches',async () => {
    sinon.stub(Match, 'findAll').resolves(MatchesMock.findAll())
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=lalal')
    expect(chaiHttpResponse.body).to.be.eql({message: INVALID_QUERY.message})
  })
})