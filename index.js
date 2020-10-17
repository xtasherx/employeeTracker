const inquirer = require('inquirer');
const consoleTable = require( 'console.table');
const mysql = require('mysql');
// creates connection to db 
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

  });

  
function findRoleId(ans) {
    let roleId ="";
    if (ans === "Software engineer") {
       roleId = 2;
    } else if(ans === "Lawyer"){
        roleId = 3;
    } else if (ans === "Accountant" ) {
        roleId = 4;
    } else if (ans ==="Manager"){
        roleId = 5;
    }

    return roleId;
}

function updateRole(){
    let query = "SELECT * FROM EMPLOYEE";
    connection.query(query,(err,res) => {
        let employeeChoices = [];
        res.forEach((emp) => {
            employeeChoices.push(`${emp.firstName} ${emp.lastName}`)
        })

        
        inquirer.prompt([{
            type: "list",
            message:"Which employee would you like to update?",
            name: "empList",
            choices: employeeChoices,
        }]).then((ans) => {
            let query = "SELECT * FROM employee WHERE employee.firstName"
            console.log(`employee role updated.`);
        }
            
        )
    })
}

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

function viewEmpsDept() {
    let query = "SELECT employee.id, employee.firstName , employee.lastName, role.title, role.salary, department.name FROM role INNER JOIN employee ON employee.roleId = role.departmentId INNER JOIN department ON role.departmentId = department.id ORDER BY department.id";
    connection.query(query,(err,res) => {     
        let employees = [];
        res.forEach((emp,index) => {
            employees.push([emp.id,emp.firstName,emp.lastName,emp.title,emp.salary,emp.name]) ;
        })
        console.table(["id","first name","last name","title","salary","department"],employees);
          return menu();
    });
    


function addEmps(ans) {
    let roleId = findRoleId(ans.addRole);
    let query = "INSERT INTO employee (employee.firstName,employee.lastName,employee.roleId)VALUES(?,?,?)";
    let empItems = [ans.addEmpFirst,ans.addEmpLast,roleId];
    connection.query(query,empItems,(err,res) => {
        console.log("added employee");
    })
    return menu();
}

const menu = ()=>{
inquirer.prompt(

    [{message:"What would you like to do?",
type: "list",
name: "choices",
choices: ["View employees","View employees by department",
"Add Employee","Remove Employee","Update Employee Role"]},
{
    name: "addEmpFirst",
    message:"What is the employee's first name?",
    when: (ans) => ans.choices === "Add Employee"
},{
    name: "addEmpLast",
    message: "What is the employees last name?",
    when: (ans) => ans.choices === "Add Employee"
},
{
    type: "list",
    name: "addRole",
    message: "What is the employees role?",
    choices: ["Software engineer", "Manager", "Lawyer", "Accountant"],
    when: (ans) => ans.choices === "Add Employee"
},
{
    name: "addEmpLast",
    message: "What is the employees last name?",
    when: (ans) => ans.choices === "Add Employee"
}

]
).then((ans) => {
    if(ans.choices === "View employees"){
        viewEmps();
    } else if (ans.choices === "Add Employee"){
        addEmps(ans);
    } else if (ans.choices === "View employees by department") {
        viewEmpsDept();
    } else if (ans.choices === "Update Employee Role"){
        updateRole();
    }
}

)}

menu();