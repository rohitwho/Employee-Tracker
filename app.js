require('dotenv').config()
const inquirer = require("inquirer");
const db = require("./db/connection.js");
const cTable = require("console.table");





const init = () => {


    console.log("---------------EMPLOYEE TRACKER-------------------")


    return inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "Update employee managers"]


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

        }
    })
}

// view all Departments
const viewAllDepartments = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });

};
// view role assigned 
const viewAllRoles = () => {

    db.query("SELECT role.roleid AS `Unique Id`,role.title AS `Job Title`,role.salary AS `Employee Salary`,department.name AS Department FROM role INNER JOIN department ON role.departmentId = department.departmentid;", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();

    })

}

// view all employees
const viewAllEmployees = () => {
    db.query("SELECT employee.employeeid AS `Unique ID`, employee.first_name, employee.last_name,department.name AS Department,role.title ,role.salary AS `Employee Salary`,manager.first_name AS Manager from employee  INNER JOIN role ON employee.role_id = role.roleid INNER JOIN department ON role.departmentId = department.departmentid LEFT JOIN employee AS Manager ON employee.manager_id = manager.employeeid;", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })

}
// adds a new department into the department table
const addDepartment = () => {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: "Please Type in a new Department name"

    }]).then(res => {
        let userInput = res.department
        db.query("INSERT INTO department (name) Values (?)", [userInput])
        console.log(`New Department Recognized Name: ${userInput}`)
        init();
    });


}
// adds a new role int the role table
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

// adds a new employee into the employee table
const addEmployee = () => {
    db.query("SELECT employee.*, role.title AS role_name, manager.first_name AS manager_name FROM employee LEFT JOIN role ON employee.role_id = role.role_id LEFT JOIN employee AS manager ON employee.manager_id = manager.employeeid", (err, res) => {
        if (err) throw err;

        const employee = res.map((employee) => ({ name: employee.role_name, value: employee.employeeid }));
        const manager = res.map((manager) => ({ name: manager.manager_name, value: manager.employeeid }));

        console.log(employee);
        console.log(manager);





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

        }, {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: manager
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


// updates employee role
const updateEmployee = () => {
    db.query("SELECT * FROM employee", (err, res) => {

        if (err) throw err;
        const employees = res.map((employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.employeeid })))

        console.log(employees);

        db.query("SELECT * FROM role", (err, res) => {



            const roles = res.map((role) => ({ name: role.title, value: role.role_id }));



            inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Which employee do you want to update?",
                    choices: employees
                },
                {
                    name: "role",
                    type: "list",
                    message: "Which role do you want to assign to the selected employee?",
                    choices: roles
                }
            ]).then((res) => {

                const updateEmployee = res.employee;

                const updateRole = res.role;

                console.log("Here is the employee: " + updateEmployee);
                console.log("Here is the role: " + updateRole);

                db.query(`UPDATE employee SET role_id= ? WHERE employeeid = ?;`, [updateRole, updateEmployee], (err) => {
                    if (err) throw err;
                    console.log("Employee role has been updated");
                    init();
                });
            });
        });
    });

}

// update employees manager

const updateManager = () => {
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err
        const response = res.map((eName => ({ name: eName.first_name + " " + eName.last_name, value: eName.employeeid })))
        const manager = res.map((manage => ({ name: manage.first_name + " " + manage.last_name, value: manage.manager_id })))
        console.log(response);



        inquirer.prompt([{
            type: "list",
            name: "emName",
            message: "which employee manager do you want to update?",
            choices: response
        },
        {
            type: "list",
            name: "maName",
            message: "Choose a new manager for selected employee ",
            choices: manager

        }
        ]).then((res) => {


            const employeeName = res.response;
            const managerName = res.manager

            db.query("UPDATE employee SET  manager_id = ? WHERE employeeid =?", [employeeName, managerName], (err) => {
                if (err) throw err;
                console.log("query Sucessful!")
                init()

            })

        })

    })

}


// init()

