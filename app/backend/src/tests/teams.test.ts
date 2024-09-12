import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import { teams, team } from './mocks/teams.mock';
import SequelizeTeam from '../database/models/SequelizeTeams';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Test', function() {
  it('should return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('should return a team by id', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('should return "not found" if the team does not exist', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 1 not found');
  })

  afterEach(sinon.restore);
});