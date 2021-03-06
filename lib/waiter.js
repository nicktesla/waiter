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

//returns the wait time given the hourly demand, hourly supply, peak hours, peak demand, service durations and hourly supply
//TODO: handle hourlydemand properly right now it just means total number on demand side. it needs to be related to meanarrtime
waitTimeRun = function (meanArrTime, hourlyDemand, hourlySupply, speed, min, max) {
  //generate an n sized array of exponentially dist ti, uniform dist service time and computed wait time
  var arrivals = [];
  for(var i=0; i < hourlyDemand; i++) {
    newArrival = {};
    newArrival.interArrivalTime = interArrivalTime(meanArrTime);
    newArrival.serviceTime = demand(min, max)/speed;
    var wt;
    if(i < hourlySupply) {
      wt = 0;
    }
    else if(i == hourlySupply) {
      // if we are first in queue go through and check all the servers to see what the minimum wait time is
      var min = arrivals[i-1].waitTime
      var minIndex = i-1
      var k = i-hourlySupply
      for(j=k; j < hourlySupply; j++) {
        if(min > arrivals[j].waitTime) {
          min = arrivals[j].waitTime;
          minIndex = j;
        }
      }
     // console.log("the service time is: ", arrivals[minIndex].serviceTime);
      wt = Math.max(arrivals[minIndex].waitTime + arrivals[minIndex].serviceTime - newArrival.interArrivalTime, 0);
    }
    else {
      wt = Math.max(arrivals[i-1].waitTime + arrivals[i-1].serviceTime - newArrival.interArrivalTime, 0);
    }
    newArrival.waitTime = wt;
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

waitTime = function(meanArrTime, hourlyDemand, hourlySupply, speed, min, max, runCount) {
  var sum = 0;
  var runs = runCount?runCount:1;
  for(j=0; j <runCount; j++) {
    var wt = waitTimeRun(meanArrTime, hourlyDemand, hourlySupply, speed, 1, 2); //meanTime, hourlyDemand, speed, min, max
    sum += wt;
  }
  console.log("the wait time for speed: ", speed, " is: ", sum/runCount);
  var aveWaitTime = sum/runCount
  return aveWaitTime;
}



//returns the smallest supply that guarantees a given wait time. this first pass favors correctness over efficiency
supply = function (meanArrTime, hourlyDemand, maxWaitTime, speed, min, max, runCount) {
  // do a binary search anchored around the hourlyDemand
  //TODO: add a tolerance amount so it finds the min supply needed
  var wt = maxWaitTime + 1
  var d = hourlyDemand;
  var guess = d/2;
  while(wt > maxWaitTime) {
    console.log("the wait time is still too high: ", wt, " now using the guess: ", guess)
    wt = waitTime(meanArrTime, hourlyDemand, guess, speed, min, max,runCount)
    guess += (hourlyDemand - guess)/2
  }
  console.log("the supply should be: ", guess);
  return guess

}

module.exports = {
  waitTime: waitTime,
  supply: supply
};
