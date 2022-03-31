require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('./controller/index'));

const mongoose = require('mongoose');

app.listen(process.env.PORT, () => {
  console.log(`Listen ${process.env.PORT} port`);
});

app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.URLDB, 
  {useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
  },
  (err, res) => {
    if (err) throw err;
    console.log("DB Online");
  }
);