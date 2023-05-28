DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;



CREATE TABLE department(
      departmentid int NOT NULL AUTO_INCREMENT,

    name VARCHAR(30),
    PRIMARY KEY (departmentid)
);

CREATE TABLE role (
  roleid int NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL NOT NULL,
  departmentId INT NOT NULL,
  PRIMARY KEY (roleid),
  FOREIGN KEY (departmentId) REFERENCES department (departmentid)
);


CREATE TABLE employee (
  employeeid INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (employeeid),
FOREIGN KEY (role_id) REFERENCES role (roleid),
  FOREIGN KEY (manager_id) REFERENCES employee (employeeid)

);



-- SELECT role.roleid, role.title, employee.first_name, employee.last_name, role.salary FROM role INNER JOIN department ON role.departmentId = department.departmentid INNER JOIN employee ON employee.role_id = role.roleid;