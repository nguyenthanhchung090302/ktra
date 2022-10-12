// Exercise 01:

const express = require('express');
const app = express();
const port = 3000;
const morgan = require("morgan");
const fs = require("fs")
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Exercise 02:
// bước 1:
app.get('/api/v1/todos', (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data)=>{
    if(err) {
      throw err;
    } else {
      let users = JSON.parse(data)
      res.status(200).json(users);
      console.log(users);
    }
  });
})

// bước 2:
app.get('/api/v1/todos/:id', (req, res) => {
  let db = req.params.id
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data)=>{
    if(err) {
      throw err;
    } else {
      let users = JSON.parse(data)
      let user = users.find((e) => e.id == db )
      res.status(200).json(user)
      console.log(user);
    }
  });
});

// bước 3:
app.post(`/api/v1/todos`, (req, res) => {
  let titlePost = req.body;
  //   console.log(titlePost);
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) throw err;
    let changeData = JSON.parse(data);
    // console.log(changeData);
    let change = changeData.find((e) => e.title == titlePost);
    if (!change) {
      changeData.push(titlePost);
      fs.writeFile(
        `${__dirname}/dev-data/todos.json`,
        JSON.stringify(changeData),
        (err) => {
          if (err) {
            throw err;
          } else {
            res.status(200).json({message: "Creat Successfully"});
          }
        }
      );
    } else {
      res.status(200).json({message:"Question already exists"});
    }
  });
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})