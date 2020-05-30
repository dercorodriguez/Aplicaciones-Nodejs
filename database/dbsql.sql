-- Create a new database called 'DatabaseName'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'links'
)
CREATE DATABASE links
GO

USE links
GO

-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.users', 'U') IS NOT NULL
DROP TABLE dbo.users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.users
(
    id INTEGER IDENTITY NOT NULL PRIMARY KEY, -- primary key column
    username [VARCHAR](16) NOT NULL,
    password [VARCHAR](60) NOT NULL,
    fullname [VARCHAR](100) NOT NULL
);
GO

-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.links', 'U') IS NOT NULL
DROP TABLE dbo.links
GO
-- Create the table in the specified schema
CREATE TABLE dbo.links 
(
    id INTEGER NOT NULL PRIMARY KEY IDENTITY, -- primary key column
    title [VARCHAR](150) NOT NULL,
    url [VARCHAR](255) NOT NULL,
    description [VARCHAR](255) NOT NULL,
    user_id INTEGER NOT NULL,
    create_at DATETIME not NULL DEFAULT GETDATE(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
GO
