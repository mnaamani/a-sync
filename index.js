var async = {};

async.iterateOver = function(array, iterator, callback) {
  for (var i = 0; i < array.length; i++) {
    (function(ix){
      var cb = callback.bind(null, ix);
      iterator(array[ix], function(){
        cb.apply(null, arguments);
      });
    })(i);
  }
}

async.map = function(array, func, callback){

  var results = [];
  var returned = false;
  var processed = 0;
  //callback is optional
  callback = callback || function() {};

  async.iterateOver(array, func, function(ix, err, result){
    if (err && !returned) {
      //stop iterating and callback immediately
      returned = true;
      callback(err);

    } else{

      results[ix] = result;

      //check if we processed all array elements
      if (++processed === array.length && !returned) {
        callback(null, results);
      }
    }
  });
};


async.filter = function(array, func, callback) {
  var results = [];
  var filtered = [];
  var processed = 0;
  callback = callback || function(){};

  //once all async calls have returned filter out the elements that
  //failed the truth test
  var doCallback = function(){
    for (var i = 0; i < results.length; i++) {
      if (results[i]) {
        filtered.push(array[i]);
      }
    }
    callback(filtered);
  };

  async.iterateOver(array, func, function(ix, bool){
    results[ix] = bool;

    if(++processed === array.length){
      doCallback();
    }
  });
}

async.detect = function(array, func, callback) {
  var returned = false;
  var processed = 0;
  callback = callback || function(){};

  async.iterateOver(array, func, function(ix, found){
    if(found && !returned) {
      returned = true;
      callback(array[ix]);
    } else {
      if(++processed === array.length && !returned){
        callback();
      }
    }
  });
}
