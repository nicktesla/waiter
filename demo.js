waiter = require('./lib/waiter')


//waitTime = function(meanArrTime, hourlyDemand, hourlySupply, speed, min, max, runCount) {

var wt = waiter.waitTime(1, 100, 80, 1, 1, 60, 100000);