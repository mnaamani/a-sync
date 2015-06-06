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

  it("should invoke callback on each iteration with index of item", function(done) {
    var array = ['a', 'b', 'c'];
    var indixes = [];
    var expectedIx = [];

    for (var i = 0; i < array.length; i++) {
      expectedIx.push(i);
    }

    async.iterateOver(array, function iterator(val, cb){
      setTimeout(cb, Math.random() * 100);
    }, function callback(ix){
       indixes.push(ix);
    });

    waitForThen(
      function(){ return indixes.length === expectedIx.length; },
      function(){
        indixes.sort();
        expect(indixes).to.deep.equal(expectedIx);
        done();
      }
    );
  });
 });
});
