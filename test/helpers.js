var expect = require('chai').expect;
var sinon = require('sinon');
var async = require('../index.js');

beforeEach(function(){

});

describe("async helper functions", function(){

 describe("iterateOver(array, iterator, callback)", function() {

  it("should iterate over all array elements", function() {
    var array = ['a', 'b', 'c'];
    var results = [];

    async.iterateOver(array, function iterator(val, cb){
      results.push(val);
      cb();
    }, function(){});

    expect(results).to.deep.equal(array);
  });

  it("should invoke callback on each iteration", function() {
    var array = ['a', 'b', 'c'];
    var count = 0;

    async.iterateOver(array, function iterator(val, cb){
      cb();
    }, function callback(){
        count++;
    });

    expect(count).to.equal(array.length);
  });

  it("should invoke callback on each iteration with index of item", function() {
    var array = ['a', 'b', 'c'];
    var indixes = [];
    var expectedIx = [];

    var clock = sinon.useFakeTimers();

    for (var i = 0; i < array.length; i++) {
      expectedIx.push(i);
    }

    async.iterateOver(array, function iterator(val, cb){
      setTimeout(cb, Math.random() * 100);
    }, function callback(ix){
       indixes.push(ix);
    });

    clock.tick(150);
    clock.restore();

    expect(indixes.length).to.equal(expectedIx.length);
    indixes.sort();
    expect(indixes).to.deep.equal(expectedIx);

  });
 });
});
