import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../../src/app';
import user from './mocks/user.mock';
import SequelizeUser from '../../src/database/models/SequelizeUsers';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Tests', async function() {
  it('should return 400 if email is not provided', async function() {
    const res = await chai.request(app).post('/login').send({ password: 'test123' });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Invalid email or password');
  });

  it('should return 404 for invalid credentials', async function() {
    const { email } = user;
    const res = await chai.request(app).post('/login').send({ email, password: 'wrongpassword' });

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal('Invalid email or password');
  });

  afterEach(function() {
    sinon.restore();
  });
});

