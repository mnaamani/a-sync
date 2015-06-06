var expect = require('chai').expect;
var async = require('../index.js');

// Conditional async testing, akin to Jasmine's waitsFor()
var waitForThen = function(test, cb) {
  setTimeout(function() {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
};

beforeEach(function(){

});

describe("iterateOver", function() {

  it("should iterate over all array elements", function(done) {
    var array = ['a', 'b', 'c'];
    var count = 0;

    async.iterateOver(array, function iterator(val, callback){
      count++;
      callback();
    }, function(){});

    expect(count).to.equal(array.length);
    done();
  });

  it("should invoke callback on each iteration", function(done) {
    var array = ['a', 'b', 'c'];
    var count = 0;

    async.iterateOver(array, function iterator(val, callback){
      callback();
    }, function(){
        count++;
    });

    expect(count).to.equal(array.length);
    done();
  });

  it("should invoke callback on each iteration with index of item", function(done) {
    var array = ['a', 'b', 'c'];
    var indixes = [];
    var expectedIx = [];

    for (var i = 0; i < array.length; i++) {
      expectedIx.push(i);
    }

    async.iterateOver(array, function iterator(val, callback){
      setTimeout(callback, Math.random() * 100);
    }, function(ix){
       indixes.push(ix);
    });

    waitForThen(
      function(){ return indixes.length === array.length; },
      function(){
        indixes.sort();
        expect(indixes).to.deep.equal([0,1,2]);
        done();
      }
    );
  });

});
