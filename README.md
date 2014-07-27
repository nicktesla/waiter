[![Waiter Logo](https://dl.dropboxusercontent.com/u/106722666/waiter.gif)](https://waiter.herokuapp.com/)

 Waiter is a simple library for estimating wait times and required capacity in web and mobile marketplaces.  Despite its focus, waiter aims to be useful for capacity planning wherever there's a queue coupled with a finite ability to process the queue.
```js
//For a specified maximum wait time, output the required hourly supply
var waiter = require('waiter')
var uberPeakHours = [13, 18] //peak hours for the app are between 1pm and 6pm
var hourlyDemand = 100 // we expect 100 rides an hour normally
var peakDemand = 300 // we expect 300 rides an hour during peak periods
var rideDurations = [5, 60] // assume that all rides are between 5 minutes and an hour
var maxWaitTime = 5 // we want the maximum wait time to be 5 minutes

var hourlySupply = waiter.hourlySupply(uberPeakHours, hourlyDemand, peakDemand, rideDurations, maxWaitTime)
```

### Web Usage
  
  A hosted version of waiter useful for getting quick estimates is available [here](http://waiter.herokuapp.com). 

### Installation

```bash
$ npm install waiter
```

## Quick Start

  Compute wait times:

```js
  waiter.waitTime(normalHours, hourlyDemand, peakHours, peakDemand, serviceLengths, hourlySupply)
```

  Compute hourly supply:

```js
  waiter.hourlySupply(normalHours, hourlyDemand, peakHours, peakDemand, serviceLengths, maxWaitTime)
```

  Plots and Statistics:

```js
  waiter.waitTimeStats(normalHours, hourlyDemand, peakHours, peakDemand, serviceLengths, hourlySupply)
  waiter.waitTimePlot(normalHours, hourlyDemand, peakHours, peakDemand, serviceLengths, hourlySupply)
  
  waiter.hourlySupplyStats(normalHours, hourlyDemand, peakHours, peakDemand, serviceLengths, maxWaitTime)
  waiter.hourlySupplyPlot(normalHours, hourlyDemand, peakHours, peakDemand, serviceLengths, maxWaitTime)
```

## Features

  * Wait time estimation
  * Capacity planning

### Contributors

 * Author: [nicktesla](https://github.com/nicktesla)

### License

  [MIT](LICENSE)
