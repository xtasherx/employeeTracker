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
    let query = "SELECT employee.id, employee.firstName , employee.lastName, role.title, role.salary, department.name FROM role INNER JOIN employee ON employee.roleId = role.id INNER JOIN department ON role.departmentId = department.id ORDER BY employee.id";
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
//  add roles 
function addRole(ans){
    let query = 'SELECT * FROM department';
    connection.query(query, (err,res) => {
        let deptChoices = [];
        let dept = [];
        res.forEach((dep) => {
            dept.push({id: dep.id, dept:dep.name});
            deptChoices.push(`${dep.name}`);
        })
        inquirer.prompt([
            {
            name: "addRole",
            message: "What is the role title?"
        },{
            name: "addSalary",
            message: "What is the salary for this role?"
        },{
            type: "list",
            name: "addDept",
            message: "What is the Department ID?",
            choices: deptChoices
        }
    ]).then((res) => {
            let id = '';
            dept.forEach((a) => {
                if (a.name === ans.addDept) {
                    id = a.id;
                }
            })
            let query = "INSERT INTO role(title, salary, departmentId)VALUES(?,?,?)";
            connection.query(query,[res.addRole,res.addSalary, id],(err,res) => {    
            })
            return menu ();
        })
    })

}


//  add employees 
function addEmps(ans) {

    let query = "SELECT * FROM role";
    connection.query(query,(err,res) => {
        let roleChoices = [];
        let roles = [];
        res.forEach((role) => {
            roles.push({id: role.departmentId, role:role.title});
            roleChoices.push(`${role.title}`);
        })
       
        inquirer.prompt([
            {
                type: 'list',
                name: 'roleChoice',
                message: `What is the employee's role?`,
                choices: roleChoices
            },
            {
                name: 'firstName',
                message: `What is the employee's first name?`
            },
            {
                name: 'lastName',
                message: `What is the employee's last name?`
            }]).then((ans) => {
               
                let id = '';
                roles.forEach((a) => {
                    if (a.role === ans.roleChoice) {
                        id = a.id;
                    }
                })

                let query = "INSERT INTO employee(firstName, lastName, roleId)VALUES(?,?,?)";
                connection.query(query,[ans.firstName,ans.lastName,id],(err,res) => {    
            })
                return menu ();
            })
    })

    }
//  update role 

function updateRole() {
    let query = "SELECT * FROM employee";
    connection.query(query,(err,res) => {
        let employeeChoices = [];
        let employees = [];
        res.forEach((emp) => {
            employees.push({id: emp.roleId, firstName: emp.firstName, lastName: emp.lastName, fullName: `${emp.firstName} ${emp.lastName}`});
            employeeChoices.push(`${emp.firstName} ${emp.lastName}`);
        })

        inquirer.prompt([{
            type: "list",
            message:"Which employee would you like to update?",
            name: "empList",
            choices: employeeChoices,
        },
        {
            name: "newId",
            message: "What is the employee's new role Id?"
        }
]).then((ans) => {
            
            let firstName = '';
            let id = '';
            employees.forEach((a) => {
                if (a.fullName === ans.empList) {
                    firstName = a.firstName;
                    id = ans.newId;
                }
            })
            let query = "UPDATE employee SET roleId = ? WHERE firstName = ?";
            console.log(id);
            console.log(firstName);
            connection.query(query,[id, firstName],(err,res) => {   
                
            })
            return menu();   
        }
        
        )
    })
}
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
    } else if (ans.menu === "Add Role"){
        addRole(ans);
    } else if (ans.menu === "Add Employee"){
        addEmps(ans);
    } else if (ans.menu === "Update Employee Role"){
        updateRole();
    }
}

);
}
menu();