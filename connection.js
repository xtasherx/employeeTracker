let mysql = require("mysql");


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


