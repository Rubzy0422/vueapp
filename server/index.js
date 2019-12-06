const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;

//Middleware
app.use(bodyparser.json());
app.use(cors());

const posts = require('./api/routes/posts');
app.use('/api/posts', posts);

app.listen(port, ()=> console.log(`server started on port ${port}`));
