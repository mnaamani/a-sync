async.map([1, 2, 3, 4, 5, 6, 7], function(num, callback){

  setTimeout(function(){
    callback(null, num * num);
  }, Math.random() * 500);

}, function(err, squares){
  console.log(squares); // [1, 4, 9, 16, 25, 36, 49]
});


async.filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], function(num, callback){

  setTimeout(function(){
    callback( num % 2 === 0 );
  }, Math.random() * 500);

}, function(even){
  console.log(even); // [2,4,6,8,10,12]
});


async.detect([500,450,400,350,50], function(delay, callback){
  setTimeout(function(){
    callback(delay === 50);
  }, delay);

}, function(val){
  console.log(val === 50);
});
