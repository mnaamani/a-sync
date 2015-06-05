var async = {};

async.map = function(array, func, callback){

  var results = [];
  var error;

  for (var i = 0; i < array.length; i++){

    func(array[i], function(err, result){
      //store error if we encounter one
      //it will only be the last encountered one
      //or should we throw it ?
      if (err) {
        error = err;
      }

      //push into our results array - even if it is undefined
      //to keep track of all calls to func
      results.push(result);

      //check if we processed all array elements
      if(results.length === array.length){
        callback(error, results);
      }
    });
  }
};


async.filter = function(array, func, callback) {
  var results = [];
  var filtered = [];

  //once all async calls have returned filter out the elements that
  //failed the truth test
  var doCallback = function(){
    for (var i = 0; i < result.length; i++) {
      if (results[i]) {
        filtered.push(array[i]);
      }
    }
    return filtered;
  };

  for (var i = 0; i < array.length; i++){

    //returned boolean value is considered the result of the trush test
    func(array[i], function(err, bool){
      results.push(bool);

      if(results.length === array.length){
        doCallback();
      }
    });
  }
}
