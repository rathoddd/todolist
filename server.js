const express = require("express");
const app = express();

const path = require('path');
const hbs = require('hbs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { query } = require("express");

const mysql = require("mysql2");
const res = require("express/lib/response");
const con = mysql.createConnection({
              
      host: "0.0.0.0",
      user: "root",
      password: "",
      port:'3306',
      database:"testing"
    });
    con.connect(function(err,connect) {
        if (err) throw err;
        else if(connect){
          console.log("Connected!");
      
        }
        else{
          console.log("something wrong");
        }
       //con.query("CREATE DATABASE newdata", function (err, result) {
         // if (err) throw err;
        //  console.log("Database created");
      
       // });
      });
// Create server

const port = process.env.port || 8090;

app.use(express.static('./public/view/'));

app.set('views', path.join('./public/view/'))
app.set('view engine', "hbs");

// app.set("view engine:","hbs");
// app.set("view:","./view")

//routing
app.get("/", async (req,res)=> {
    res.render("index");
 

});

app.get("/add", async (req,res)=> {
  res.render("index");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
});
app.get("/update", async (req,res)=> {
  res.render("index");

});
app.get("/search", async (req,res)=> {
  res.render("index");

});
app.get("/view", async (req,res)=> {
  res.render("index");

});
app.get("/delete", async (req,res)=> {
  res.render("index");

});

// get data mysql db and bind html form (worklog detail)

app.get('/showdetail', function(req, res, next) {
  var sql='SELECT * FROM worklog';
  con.query(sql, function (err, results) {
  if (err) throw err;
  res.json({
    data : results
  })
  console.log(results);
});
});




app.get('/showdropdown', function(req, res, next) {
  var sql='SELECT * FROM customer';
  con.query(sql, function (err, results) {
  if (err) throw err;
  res.json({
    data : results
  })
  console.log(results);
});
});

// emp detail show mysql db
app.get('/showempdetail', function(req, res, next) {
  var sql='SELECT * FROM employee';
  con.query(sql, function (err, results) {
  if (err) throw err;
  res.json({
    data : results
  })
  console.log(results);
});
});

// send data login form to mysql db
app.post("/adddetail",(req,res)=>{
  if(!req.body.name)
  {
    res.send("Name is missing.");
  }
  // if(!req.body.lname)
  // {
  //   res.send("Last name is missing.");
  // }
  // if(!req.body.date)
  // {
  //   res.send("Date is missing.");
  // }
  // if(!req.body.time)
  // {
  //   res.send("Time is missing.");
  // }
  // if(!req.body.status)
  // {
  //   res.send("Status is missing.");
  // }
    var name = req.body.name;
    console.log("name", name);
    var lname = req.body.lname;
    var date = req.body.date;
    var time = req.body.time;
    var status = req.body.status;
    // var customerName = req.body.customerName;
    // var employeeName = req.body.employeeName;


    var que = `SELECT customerName FROM customer WHERE projectName = "${name}"`;
    con.query(que, function(err, result1) {
      if(err) throw err;
      if(!result1[0])
      {
          res.send("Invaild project name.");
      }
      else
      {
      var cust_name = result1[0].customerName;
    var sql = `INSERT INTO worklog (name, lname, date, time,status,customerName) VALUES ("${name}", "${lname}", "${date}", "${time}","${status}","${cust_name}")`;
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      console.log(result.affectedRows);
      if(result.affectedRows == 1)
      {
        console.log("Done");
          res.send('Data added successfully!');
      }
     //res.redirect('/');
    });
  }
  })
})
  app.post('/projectadd/',(req,res)=>{
  
     var proj = req.body.projectName;
    var cust = req.body.customerName;
    var description = req.body.description;
    var startdate = req.body.startdate;
    var deadline = req.body.deadline;

    
    var sql = `INSERT INTO customer (projectName, customerName,description,startdate,deadline) VALUES ("${proj}", "${cust}","${description}","${startdate}","${deadline}")`;
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      console.log(result.affectedRows);
      if(result.affectedRows == 1)
      {
        console.log("Done"); 
          res.json('Data added successfully!');
      }
     //res.redirect('/');
    });

  })


  app.post('/useradd/',(req,res)=>{
    var username = req.body.employee_id;
    var password = req.body.password;
    var sql = `INSERT INTO employee (employee_id,password) VALUES ("${username}", "${password}")`;
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      console.log(result.affectedRows);
      if(result.affectedRows == 1)
      {
        console.log("Done");
          res.send('Data added successfully!');
      }
     //res.redirect('/');
    });
  })

  // app.post("/addtask",(req,res)=>{
  //   if(!req.body.employee_id)
  //   {
  //     res.send("Name is missing.");
  //   }
  //   if(!req.body.task_id)
  //   {
  //     res.send("Last name is missing.");
  //   }
  //   if(!req.body.description)
  //   {
  //     res.send("Date is missing.");
  //   }
  //   if(!req.body.project_name)
  //   {
  //     res.send("Time is missing.");
  //   }
  //   if(!req.body.worklog_name)
  //   {
  //     res.send("Status is missing.");
  //   }
  //     var employee_id = req.body.employee_id;
  //     var task_id = req.body.task_id;
  //     var description = req.body.description;
  //     var project_name = req.body.project_name;
  //     var worklog_name = req.body.worklog_name;

  //     var date = req.body.date;
  //     var time = req.body.time;
  //     var start_time = req.body.start_time;
  //     var end_time = req.body.end_time;
  //     var status = req.body.status;
  
  //     var sql = `INSERT INTO task (employee_id, task_id, description, project_name,worklog_name,date,time,start_time,end_time,status) VALUES ("${employee_id}", "${task_id}", "${description}}", "${project_name}","${worklog_name}","${date}","${time}","${start_time}","${end_time}","${status}")`;
  //     con.query(sql, function(err, result) {
  //       if (err) throw err;
  //       console.log('record inserted');
  //       console.log(result.affectedRows);
  //       if(result.affectedRows == 1)
  //       {
  //         console.log("Done");
  //           res.send('Data added successfully!');
  //       }
  //      //res.redirect('/');
  //     });
  //   });

  app.post('/login', function(request, response) {
    var username = request.body.employee_id;
    var password = request.body.password;
    //console.log(username);

    if (username && password) {

        con.query('SELECT * FROM employee WHERE employee_id = ? AND password = ?', [username, password], function(error, results) {
          //  if(error)
          //  {
          //    console.error(error);
          //  }
          console.log(results.length);
           if(results.length == 0)
           {
             console.log("Invaild Data.");
             response.send("Username and Password is incorrect.");
           }
           else
           {
            if (results[0].employee_id == username || results[0].password == password) {
              // if(results[0].password == password)
              {
 
                 response.send("Login successfully.");
              }
               
            } else {

                    // response.send("admin")
                response.send('Incorrect Username and/or Password!');
            }     
         }      
        });
    } else {
        response.send('Please enter Username and Password!');
    }
});
  


console.log("Server is running on 8090 :)");
app.listen(port);

console.log ("server created");
