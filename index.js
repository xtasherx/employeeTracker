const inquirer = require('inquirer');
const consoleTable = require( 'console.table');

inquirer.prompt(
    [{message:"What would you like to do?",
type: "list",
name: "choices",
choices: ["View employees","View employees by department","View Employees by manager", 
"Add Employee","Remove Employee","Update Employee Role","Update manager"]},{
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
    name: "addDept",
    message: "What department does this employee belong to?",
    choices: ["Management", "Sales","Legal","Engineering"],
    when: (ans) => ans.choices === "Add Employee"
},
{
    type: "list",
    name: "addRole",
    message: "What is the employees role?",
    choices: ["Software engineer", "Manager", "Lawyer","Legal team Lead", "Sales Lead", "Salesperson"],
    when: (ans) => ans.choices === "Add Employee"
},
{
    name: "addEmpLast",
    message: "What is the employees last name?",
    when: (ans) => ans.choices === "Add Employee"
}
]
).then(
   ans => {
   console.log(ans.choices);    
   });
