import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response, NextFunction } from 'express';
const { expect } = chai;

import team from '../database/models/TeamModel';
import teamController from '../database/controllers/teamController';
import { app } from '../app';

chai.use(chaiHttp);

describe('Team Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: sinon.SinonStub;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    mockNext = sinon.stub();
  });
  afterEach(() => {
    sinon.restore(); 
  });

  it('Deve retornar a lista de times com status 200', async () => {
    const mockTeams = [
      { id: 1, teamName: 'Avaí/Kindermann' },
      { id: 2, teamName: 'Bahia' },
    ];

    sinon.stub(team, 'findAll').resolves(mockTeams as team[]);

    const controllerMethod = teamController.stack.find((layer: any) => layer.route && layer.route.path === '/' && layer.route.methods.get).route.stack[0].handle;

    await controllerMethod(mockReq as Request, mockRes as Response, mockNext as unknown as NextFunction);

    expect((mockRes.status as sinon.SinonStub).calledWith(200)).to.be.true;

    expect((mockRes.json as sinon.SinonStub).calledWith(mockTeams)).to.be.true;
  });

  it('Deve retornar status 500 em caso de erro', async () => {
    sinon.stub(team, 'findAll').throws(new Error('Erro de banco de dados'));

    const controllerMethod = teamController.stack.find((layer: any) => layer.route && layer.route.path === '/' && layer.route.methods.get).route.stack[0].handle;

    await controllerMethod(mockReq as Request, mockRes as Response, mockNext as unknown as NextFunction);

    expect((mockRes.status as sinon.SinonStub).calledWith(500)).to.be.true;

    expect((mockRes.json as sinon.SinonStub).calledWith({ message: 'Internal Server Error' })).to.be.true;
  });
});


describe('App', () => {
  let errorMiddlewareStub: sinon.SinonStub;

  beforeEach(() => {
    sinon.restore();
  });

  it('Deve retornar status 200 para a rota raiz', async () => {
    const res = await chai.request(app).get('/');

    expect(res).to.have.status(200);

    expect(res.body).to.deep.equal({ ok: true });
  });

});


