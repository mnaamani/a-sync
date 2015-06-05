var async = {};

// https://github.com/caolan/async#map

async.map = function(array, func, callback){

  var results = [];
  var keepGoing = true;
  var processed = 0;
  //callback is optional
  callback = callback || function() {};

  for (var i = 0; i < array.length && keepGoing; i++) {

    (function(ix){
      func(array[ix], function(err, result){
        if (err) {
          //stop iterating and callback immediately
          keepGoing = false;
          callback(err);

        } else{

          results[ix] = result;
          processed++;

          //check if we processed all array elements
          if (processed === array.length) {
            callback(null, results);
          }
        }
      });
    })(i);
  }
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

  for (var i = 0; i < array.length; i++){

    (function(ix){
      func(array[ix], function(bool){
        results[ix] = bool;

        if(processed === array.length){
          doCallback();
        }
      });
    })(i);

  }
}
