INSERT INTO department (name)
VALUES
('Accounting'),
('Human Resources'),
('Marketing'),
('Project Manager');

INSERT INTO role (title, salary, department_id)
VALUES
('Chief Accounting Officer', 10000, 1),
('Accounting Manager', 9500, 1),
('Accountant', 7000, 1),
('Accounting Clerk', 4000, 1),
('Vice President (HR)', 9200, 2),
('Director (HR)', 9000, 2),
('Manager (HR)', 8600, 2),
('Entry Level (HR)', 4000, 2),
('Vice President of Digital Marketing', 11000, 3),
('Sales and Marketing Manager', 9400, 3),
('Sales and Marketing Executive', 8300, 3),
('Senior Project Manager', 10000, 4),
('Assistant Project Manager', 6000, 4),
('Project Coordinator', 5000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Smith', 12, 1),
('Ethan', 'Anderson', 11, 2),
('Ava', 'Peterson', 10, 3),
('Noah', 'Ramirez', 9, 4),
('Olivia', 'Bennett', 8, 5),
('Liam', 'Cooper', 7, 6),
('Emma', 'Jenkins', 6, 7),
('Mason', 'Rodriguez', 5, 8),
('Sophia', 'Morgan', 4, 9),
('Lucas', 'Mitchell', 3, 10),
('Mia', 'Turner', 2, 11),
('Isabella', 'Reed', 1, 12);

