둘이 같다
https://stackoverflow.com/questions/60765304/why-we-pass-app-in-http-createserverapp
```JS
// Node.js
const http = require('http').createServer(app);
http.listen(8080, ()=>{
 console.log('listening on 8080');
});

// express
app.listen(3000, () => console.log('Server started'))
```


https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
```
app.use(express.json())
```