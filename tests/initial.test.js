/* global describe it */

/* eslint-disable */

const assert = require('assert');
const { expect, should } = require('chai');

/* eslint-enable */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Test Biolerplate', function() {
  it('should have tests', function() {
    return expect(true).to.equal(true);
  });
});
