let mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Fpt5ozeat6qnuY5VWpeC",
  database: "employeesys",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  addEmployee();
});

function addEmployee() {
  console.log("Inserting a new employee...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      firstName: "Rocky Road",
      lastName: 3.0,
      roleId: 50,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}


