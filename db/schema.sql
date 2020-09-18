-- Drop databse if not exists
DROP DATABASE IF EXISTS jobfinder_db;

CREATE DATABASE jobfinder_db;

use jobfinder_db;

create table user(
    id integer auto_increment NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(20),
    PRIMARY KEY(id)
    -- time will be created at sequelize
);

CREATE TABLE jobs(
    id  integer auto_increment NOT NULL,
    role VARCHAR(30) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    technology VARCHAR(50) NOT NULL,
    company VARCHAR(100) NOT NULL,
    jobtype VARCHAR(50) NOT NULL,
    salary DECIMAL,
    joblocation VARCHAR(50) NOT NULL,
    contactinfo VARCHAR(200) NOT NULL,
    --date posted will be created at sequelize
    userid INTEGER,
    CONSTRAINT fk_users FOREIGN KEY(userid)
    REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY(id)
);