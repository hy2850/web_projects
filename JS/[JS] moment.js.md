# Moment
Good docs : https://momentjs.com/docs/

single point in time

const now = moment();
const specific_date = moment('2017-12-31', 'YYYY-MM-DD');

<br>

##### Manipulate
const added = moment().add(180, 'seconds'); // returns modified moment

* subtract - btw moment  (or duration) and constant amount of time
diff - btw two moments (or durations)

<br>

##### Display
moment().format(); // to string

<br>

##### Query (comparison)
https://stackoverflow.com/questions/22600856/moment-js-date-time-comparison

<br><br>

## Duration
length of time, **contextless**
(ex. 1 hour, 360 seconds, 1 month 25 days 4 hours 31 minutes 32 seconds 34 milliseconds)

```JS
duration = moment.duration(curTime * 1000); // ms
duration.subtract(1000, "milliseconds");
console.log(duration.asSeconds());  // conv to seconds
```


<br>

* converting moment to seconds - use duration
```javascript
myVar = moment.duration(myVar).asSeconds()
```


<br><br>



Hooks와 setInterval
https://haranglog.tistory.com/10?category=926702
https://overreacted.io/making-setinterval-declarative-with-react-hooks/

web worker