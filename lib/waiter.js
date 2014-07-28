var interArrivalTime, demand, waitTime;

//generate a new exponentially distributed interarrival time using a uniform random number generator and the mean interarrival time
interArrivalTime = function (mean) {
  var u = Math.random();
  return mean*Math.log(u);
}

// generate a new demand quantity given the min and max
demand = function (min, max) {
  var u = min + (max-min)*Math.random()
  return u;
}

//returns the wait time given the hourly demand, peak hours, peak demand, service durations and hourly supply
waitTimeRun = function (meanArrTime, hourlyDemand, speed, min, max) {
  //generate an n sized array of exponentially dist ti, uniform dist service time and computed wait time
  var arrivals = [];
  for(var i=0; i < hourlyDemand; i++) {
    newArrival = {};
    newArrival.interArrivalTime = interArrivalTime(meanArrTime);
    newArrival.serviceTime = demand(min, max)/speed;
    newArrival.waitTime = i==0?0:Math.max(arrivals[i-1].waitTime + arrivals[i-1].serviceTime - newArrival.interArrivalTime, 0);
    arrivals.push(newArrival);
  }
  // now find the average wait time given the arrivals array
  var sum = 0;
  for(var j=0; j < arrivals.length; j++) {
    sum += arrivals[j].waitTime;
  }
  var aveWaitTime = sum/arrivals.length;
  return aveWaitTime;
}

waitTime = function(meanArrTime, hourlyDemand, speed, min, max, runCount) {
  var sum = 0;
  var runs = runCount?runCount:1;
  for(j=0; j <runCount; j++) {
    var wt = waiter.waitTime(meanArrTime, hourlyDemand, speed, 1, 2); //meanTime, hourlyDemand, speed, min, max
    sum += wt;
  }
  console.log("the wait time for speed: ", speed, " is: ", wt/runCount);
  var aveWaitTime = sum/runCount
  return aveWaitTime;
}



//hourly supply

module.exports = {
  waitTime: waitTime
};
