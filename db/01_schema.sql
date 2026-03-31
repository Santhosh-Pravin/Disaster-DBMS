-- 01_schema.sql
-- Create Database
CREATE DATABASE IF NOT EXISTS disaster_management;
USE disaster_management;

-- Core Lookup Tables
CREATE TABLE IF NOT EXISTS Location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    region VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    coordinates VARCHAR(50), -- Lat, Long
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Disaster_Type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Resource_Type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    unit VARCHAR(20) NOT NULL
);

-- Main Disaster Entities
CREATE TABLE IF NOT EXISTS Disaster (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type_id INT NOT NULL,
    location_id INT NOT NULL,
    severity ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    status ENUM('Active', 'Contained', 'Resolved') DEFAULT 'Active',
    date_reported DATETIME NOT NULL,
    description TEXT,
    FOREIGN KEY (type_id) REFERENCES Disaster_Type(id),
    FOREIGN KEY (location_id) REFERENCES Location(id)
);

CREATE TABLE IF NOT EXISTS Emergency_Request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending',
    date_logged DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES Location(id)
);

CREATE TABLE IF NOT EXISTS Affected_Area (
    id INT AUTO_INCREMENT PRIMARY KEY,
    disaster_id INT NOT NULL,
    region_name VARCHAR(100) NOT NULL,
    population_affected INT DEFAULT 0,
    FOREIGN KEY (disaster_id) REFERENCES Disaster(id) ON DELETE CASCADE
);

-- Victim Management
CREATE TABLE IF NOT EXISTS Victim (
    id INT AUTO_INCREMENT PRIMARY KEY,
    disaster_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender ENUM('M', 'F', 'Other'),
    medical_status ENUM('Safe', 'Injured', 'Critical', 'Missing', 'Deceased') DEFAULT 'Safe',
    FOREIGN KEY (disaster_id) REFERENCES Disaster(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Relief_Camp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    status ENUM('Open', 'Full', 'Closed') DEFAULT 'Open',
    FOREIGN KEY (location_id) REFERENCES Location(id)
);

CREATE TABLE IF NOT EXISTS Shelter_Allocation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    victim_id INT NOT NULL,
    camp_id INT NOT NULL,
    date_admitted DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_discharged DATETIME NULL,
    FOREIGN KEY (victim_id) REFERENCES Victim(id) ON DELETE CASCADE,
    FOREIGN KEY (camp_id) REFERENCES Relief_Camp(id)
);

-- Rescue Operations
CREATE TABLE IF NOT EXISTS Rescue_Team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('Available', 'Deployed', 'Resting') DEFAULT 'Available',
    location_id INT, -- Current base location
    FOREIGN KEY (location_id) REFERENCES Location(id)
);

CREATE TABLE IF NOT EXISTS Rescue_Personnel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    contact_number VARCHAR(20),
    FOREIGN KEY (team_id) REFERENCES Rescue_Team(id) ON DELETE CASCADE
);

-- Resource Management
CREATE TABLE IF NOT EXISTS Resource (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL,
    camp_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES Resource_Type(id),
    FOREIGN KEY (camp_id) REFERENCES Relief_Camp(id) ON DELETE CASCADE,
    UNIQUE KEY unique_camp_resource (camp_id, type_id)
);

-- Volunteer Management
CREATE TABLE IF NOT EXISTS Volunteer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    skills TEXT,
    status ENUM('Available', 'Assigned', 'Inactive') DEFAULT 'Available'
);

CREATE TABLE IF NOT EXISTS Volunteer_Assignment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    volunteer_id INT NOT NULL,
    disaster_id INT NOT NULL,
    task_description TEXT NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME NULL,
    FOREIGN KEY (volunteer_id) REFERENCES Volunteer(id) ON DELETE CASCADE,
    FOREIGN KEY (disaster_id) REFERENCES Disaster(id)
);
