const inquirer = require("inquirer")
const consoleTable = require( 'console.table');
const mysql = require('mysql');
// creates connection to db 

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Fpt5ozeat6qnuY5VWpeC",
    database: "employeeDb",
  });
  

  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

  });
  
//   functions to view data 

  function viewEmps() {
    let query = "SELECT employee.id, employee.firstName , employee.lastName, role.title, role.salary, department.name FROM role INNER JOIN employee ON employee.roleId = role.departmentId INNER JOIN department ON role.departmentId = department.id ORDER BY employee.id";
    connection.query(query,(err,res) => {     
        let employees = [];
        res.forEach((emp,index) => {
            employees.push([emp.id,emp.firstName,emp.lastName,emp.title,emp.salary,emp.name]) ;
        })
        console.table(["id","first name","last name","title","salary","department"],employees);
          return menu();
    });
}

function viewDepts() {
    let query = "SELECT department.id, department.name FROM department";
    connection.query(query,(err,res) => {     
        let department = [];
        res.forEach((dept,index) => {
            department.push([dept.id,dept.name]) ;
        })
        console.table(["id","name"],department);
          return menu();
    });
}

function viewRole() {
    let query = "SELECT role.id, role.title,role.salary FROM role";
    connection.query(query,(err,res) => {     
        let roles = [];
        res.forEach((role,index) => {
            roles.push([role.id,role.title,role.salary]) ;
        })
        console.table(["id","title","salary"],roles);
          return menu();
    });
}

// functions to add data 

function addDept(ans){
    inquirer.prompt([{
        name: "addDept",
        message: "What is the name of the department?"
    }]).then((res) => {
        let query = "INSERT INTO department(name)VALUES(?)";
        connection.query(query,[res.addDept],(err,res) => {    
        })
        return menu ();
    })
}

function addRole(ans){
    inquirer.prompt([{
        name: "addRole",
        message: "What is the role title?"
    }]).then((res) => {
        let query = "INSERT INTO role(title, salary, departmentId)VALUES(?)";
        connection.query(query,[res.addDept],(err,res) => {    
        })
        return menu ();
    })
}



function addEmps(ans) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'roleChoice',
            message: `What is the employee's role?`,
            choices: grabRolesTitle()
        },
        {
            name: 'firstName',
            message: `What is the employee's first name?`
        },
        {
            name: 'lastName',
            message: `What is the employee's last name?`
        }]).then((ans) => {
            console.log(ans);
        })
    }
// function to update role 

// Starts App 
const menu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ["View Employees","View Roles","View Departments","Add Employee","Add Role","Add Department", "Update Employee Role"]
        }
]).then((ans) => {
    if(ans.menu === "View Employees"){

        viewEmps();
    } else if (ans.menu === "View Departments"){

        viewDepts();
    } else if (ans.menu === "View Roles"){

        viewRole();
    } else if (ans.menu === "Add Department"){
        addDept(ans);
    }
}

);
}
menu();