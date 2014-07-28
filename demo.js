waiter = require('./lib/waiter')


/**
for(var i=1; i < 10; i++) {
  var sum = 0;
  for(j=0; j <100000; j++) {
    var wt = waiter.waitTime(100, 100, 1000*i, 1, 2); //meanTime, hourlyDemand, speed, min, max
    sum += wt;
  }
  console.log("the wait time for speed: ", 1000*i, " is: ", wt/100000);
}
**/