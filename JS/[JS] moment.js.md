const now = moment();
const specific_date = moment('2017-12-31', 'YYYY-MM-DD');

moment().format(); // to string

const added = moment().add(180, 'seconds'); // returns modified moment


## Duration
duration = moment.duration(curTime * 1000); // ms
 duration.current.subtract(1000, "milliseconds");
 console.log(duration.current.asSeconds());  // conv to seconds

converting moment to seconds - use duration
```javascript
myVar = moment.duration(myVar).asSeconds()
```

subtract - btw moment and constant time (or duration)
diff - btw two moments


<br><br>

curTime
anchorDate

moment()~anchorDate
diff 만큼 curTime set

setInterval, setTimeOut 써야겠는걸?


Hooks와 setInterval
https://haranglog.tistory.com/10?category=926702
https://overreacted.io/making-setinterval-declarative-with-react-hooks/
