const inquirer = require("inquirer");
const sql = require("mysql2");
const cTable = require("console.table");


const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    database: "employee_tracker"
})

db.connect(function (err) {
    if (err) throw err;
    console.log('CONNECTED SQL SUCCESSFUL');

})

const init = () => {


    console.log("---------------WELCOME TO MY DATABASE-------------------/n")


    return inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "Update employee managers", "View employees by manager", "View employees by department", "View the total utilized budget of a department"]


        }
    ]).then(res => {
        switch (res.action) {
            case "view all departments":
                viewAllDepartments();
                break;
            case "view all roles":
                viewAllRoles();
                break;
            case "view all employees":
                viewAllEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "update an employee role":
                updateEmployee();
                break;
            case "Update employee managers":
                updateManager();
                break;
            case "View employees by manager":
                viewEmployeesByManager();
                break;
            case "View employees by department":
                viewEmployeesByDepartment();
                break;
            case "View the total utilized budget of a department":
                viewBudget();
                break;
        }
    })
}


const viewAllDepartments = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })


  
}






// init()

