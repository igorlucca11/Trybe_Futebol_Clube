// @ts-ignore
import chaiHttp = require('chai-http');
import * as chai from 'chai';
import * as sinon from 'sinon'
import User from "../database/models/UserModel";
import UsersMock, { usersDataBase } from "./login.mock";
import { app } from "../app";
import { Response } from 'superagent';
import { where } from 'sequelize';

chai.use(chaiHttp)
const { expect } = chai;

describe('Test the endpoint /login', async () => {
  let chaiHttpResponse: Response

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore()
  })

  it('Test if the endpoint /login retorna um token', async () => {
    sinon.stub(User, 'findOne').resolves(UsersMock.findOne({where: {
      email: 'admin@admin.com',
      password: 'secret_admin',
    }}))
    chaiHttpResponse = (await chai.request(app).post('/login')
    .set('X-API-Key', 'json')
    .send({ email: 'admin@admin.com', password: 'secret_admin' }))
    expect(chaiHttpResponse.body).to.have.property('token')
  })
  it('Test if the endpoint /login retorna um erro com email incorreto', async () => {
    sinon.stub(User, 'findOne').resolves(UsersMock.findOne({where: {
      email: 'adminasd@admin.com',
      password: 'secret_admin',
    }}))
    chaiHttpResponse = (await chai.request(app).post('/login')
    .set('X-API-Key', 'json')
    .send({ email: 'adminasfd@admin.com', password: 'secret_admin' }))
    expect(chaiHttpResponse.body).to.have.property('message')
  })
  it('Test if the endpoint /login retorna um erro com email invalido', async () => {
    sinon.stub(User, 'findOne').resolves(UsersMock.findOne({where: {
      email: 'adminasdadmin.com',
      password: 'secret_admin',
    }}))
    chaiHttpResponse = (await chai.request(app).post('/login')
    .set('X-API-Key', 'json')
    .send({ email: 'adminasfdadmin.com', password: 'secret_admin' }))
    expect(chaiHttpResponse.body).to.have.property('message')
  })
  it('Test if the endpoint /login retorna um erro sem senha', async () => {
    sinon.stub(User, 'findOne').resolves(UsersMock.findOne({where: {
      email: 'admin@admin.com',
      password: 'secret_admin',
    }}))
    chaiHttpResponse = (await chai.request(app).post('/login')
    .set('X-API-Key', 'json')
    .send({ email: 'admin@admin.com' }))
    expect(chaiHttpResponse.body).to.have.property('message')
  })
  it('Test if the endpoint /login retorna um erro sem senha', async () => {
    sinon.stub(User, 'findOne').resolves(UsersMock.findOne({where: {
      email: 'adminasdf@admin.com',
      password: 'secret_admin',
    }}))
    chaiHttpResponse = (await chai.request(app).post('/login')
    .set('X-API-Key', 'json')
    .send({ email: 'adminasdf@admin.com', password: 'secret_admin' }))
    expect(chaiHttpResponse.body).to.have.property('message')
  })
  
})
