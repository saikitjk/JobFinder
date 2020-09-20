-- Drop databse if not exists
DROP DATABASE IF EXISTS jobfinder_db;

CREATE DATABASE jobfinder_db;

use jobfinder_db;

create table User(
    id integer auto_increment NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(20),
    PRIMARY KEY(id)
    -- time will be created at sequelize
);


CREATE TABLE Jobs(
    id  integer auto_increment NOT NULL,
    role VARCHAR(30) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    technology VARCHAR(50) NOT NULL,
    company VARCHAR(100) NOT NULL,
    jobtype VARCHAR(50) NOT NULL,
    salary DECIMAL,
    joblocation VARCHAR(50) NOT NULL,
    contact VARCHAR(70) NOT NULL,
    --date posted will be created at sequelize
    userId INTEGER,
    -- user in jobs table
    CONSTRAINT fk_users FOREIGN KEY(userId)
    REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY(id)
);