require('dotenv').config()
const inquirer = require("inquirer");
const db = require("./db/connection.js");
const sql = require("mysql2");
const cTable = require("console.table");




db.connect(function (err) {
    if (err) throw err;
    console.log('CONNECTED SQL SUCCESSFUL');
    init();
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
    });

};

const viewAllRoles = () => {

    db.query("SELECT role.roleid AS `Unique Id`,role.title AS `Job Title`,role.salary AS `Employee Salary`,department.name AS Department FROM role INNER JOIN department ON role.departmentId = department.departmentid;", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();

    })

}


const viewAllEmployees = () => {
    db.query("SELECT employee.employeeid AS `Unique ID`, employee.first_name, employee.last_name,department.name AS Department,role.title ,role.salary AS `Employee Salary`,manager.first_name AS Manager from employee  INNER JOIN role ON employee.role_id = role.roleid INNER JOIN department ON role.departmentId = department.departmentid LEFT JOIN employee AS Manager ON employee.manager_id = manager.employeeid;", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })

}

const addDepartment = () => {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: "Please Type in a new DEpartment NAme"

    }]).then(res => {
        let userInput = res.department
        db.query("INSERT INTO department (name) Values (?)", [userInput])
        console.log(`New Department Recognized Name: ${userInput}`)
        init();
    });


}

const addRole = () => {
    db.query("SELECT * FROM department", (err, res) => {

        if (err) throw err;
        const departments = res.map((department) => ({ name: department.name, value: department.departmentid }));
        console.log(departments)

        inquirer.prompt([{

            name: "title",
            type: "input",
            message: "Please Type in a new Role Name",
        },
        {
            name: "salary",
            type: "input",
            message: "Please Type in a new Role Salary",
        },
        {
            name: "department",
            type: "list",
            message: "Which department would you like to add into?",
            choices: departments,
        },
        ]).then(res => {
            if (err) throw err;
            let newRole = res.title
            console.log(newRole);

            let newSalary = res.salary
            console.log(newSalary);
            let newDept = res.department
            console.log(newDept);
            db.query("INSERT INTO role (title, salary, departmentId) Values (?,?,?)", [newRole, newSalary, newDept])
            if (err) throw err;
            console.log(`New Role has been Added name: ${newRole}`)
            init();
        })

    })
}


const addEmployee = () => {
    db.query("SELECT role_id,manager_id FROM employee", (err, res) => {

        if (err) throw err;

        const employee = res.map((employee => ({ name: employee.role_id })))
        const manager  = res.map((manager=>({name:manager.manager_id})))
        console.log(employee)
        console.log(manager)

        inquirer.prompt([{
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",

        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: employee

        },{
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices:manager
        }
    ]).then(res => {
            if (err) throw err;
            let first = res.first_name;
            let last = res.last_name;
            let role = res.role;
            let nManager = res.manager_id;
            db.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)", [first, last, role, nManager])
            if (err) throw err
            init()
        })



    })





}

// init()

