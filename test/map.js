var expect = require('chai').expect;
var sinon = require('sinon');
var async = require('../index.js');

beforeEach(function(){

});


describe("async.map", function() {

  it("should iterate over all array elements", function() {
    var array = Array(5);

    var iterator = sinon.spy();

    async.map(array, iterator);

    expect(iterator.callCount).to.equal(array.length);
  });

  it("should invoke callback only once", function() {
    var array = Array(5);

    var iterator = sinon.spy(function(val, cb){
      cb();
    });

    var callback = sinon.spy();

    async.map(array, iterator, callback);

    expect(callback.calledOnce).to.equal(true);

  });

  it("should invoke callback immediately on error", function() {
    var array = Array(5);
    var error = 'error';
    var iterator = sinon.spy(function(val, cb){
      cb(error);
    });

    var callback = sinon.spy();

    async.map(array, iterator, callback);

    expect(callback.calledOnce).to.equal(true);
    expect(callback.calledWith(error)).to.equal(true);

  });

  it("should return a results array", function(){
    var array = Array(5);

    var iterator = sinon.spy(function(val, cb){
      cb(null);
    });

    var callback = sinon.spy();

    async.map(array, iterator, callback);

    expect(callback.calledOnce).to.equal(true);
    expect(callback.args[0][0]).to.equal(null);
    expect(Array.isArray(callback.args[0][1])).to.equal(true);
    expect(callback.args[0][1].length).to.equal(array.length);

  });

  it("should preserve order of mapped results array", function(){
    var array = [1, 2, 3, 4, 5];
    var clock = sinon.useFakeTimers();

    var iterator = sinon.spy(function(val, cb){
      setTimeout(function(){
        cb(null, val);
      }, Math.random() * 100);
    });

    var callback = sinon.spy();

    async.map(array, iterator, callback);

    clock.tick(150);
    clock.restore();

    expect(callback.args[0][1]).to.deep.equal(array);

  });
});
