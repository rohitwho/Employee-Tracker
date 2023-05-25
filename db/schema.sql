DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;


CREATE TABLE department(
    id INT PRIMARY KEY,

    name VARCHAR(30),
);

CREATE TABLE role(
id INT PRIMARY KEY,


title VARCHAR(50) NOT NULL,


salary DECIMAL NOT NULL,


department_id INT NOT NULL,
);

CREATE TABLE employee(
id INT PRIMARY KEY,


first_name VARCHAR(30) NOT NULL,


last_name VARCHAR(30) NOT NULL,


role_id INT NOT NULL,


manager_id INT ,
);