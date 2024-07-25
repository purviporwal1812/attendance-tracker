### Dependencies

**nodemon** : `` npm i -D nodemon ``
automatically restarts the node application when file changes are detected .

**express** : ``npm i express``
minimalist web framework for Node.js.

**pg** : ``npm i pg``
postgresql for node.js

**ejs** : ``npm i ejs``
embedded js
looks into the ‘views’ folder for the templates to render

```
app.get('/', (req, res) => { 
	res.render('home'); 
});
```

for dynamic content , render method can take object as second parameter

**dotenv** : ``npm i dotenv``
Dotenv is a zero-dependency module that loads environment variables from a .env file into ``process.env``
