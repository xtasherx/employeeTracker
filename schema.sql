DROP DATABASE IF EXISTS employeeDb;
CREATE database employeeDb;

USE employeeDb;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (30),
PRIMARY KEY
    (id)
    
);

    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
    title VARCHAR
        (30),
    salary VARCHAR
        (30),
    departmentId INT,       
PRIMARY KEY
        (id),
        FOREIGN KEY
        (departmentId) REFERENCES department
        (id)
    
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
    firstName VARCHAR
            (30),
    lastName VARCHAR
            (30),
    roleId INT,       
    managerId INT,
PRIMARY KEY
            (id),
        FOREIGN KEY
            (roleId) REFERENCES role
            (id)
    
);

            SELECT *
            FROM employeDb;
