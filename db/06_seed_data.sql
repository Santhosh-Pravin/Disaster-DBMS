-- 06_seed_data.sql
USE disaster_management;

-- Insert Disaster Types
INSERT INTO Disaster_Type (type_name) VALUES 
('Earthquake'), ('Flood'), ('Hurricane'), ('Wildfire'), ('Tsunami');

-- Insert Locations
INSERT INTO Location (region, city, coordinates) VALUES 
('California', 'San Francisco', '37.7749,-122.4194'),
('Florida', 'Miami', '25.7617,-80.1918'),
('Texas', 'Houston', '29.7604,-95.3698'),
('Washington', 'Seattle', '47.6062,-122.3321');

-- Insert Disasters
INSERT INTO Disaster (name, type_id, location_id, severity, status, date_reported, description) VALUES 
('SF Earthquake 2024', 1, 1, 'Critical', 'Active', NOW() - INTERVAL 2 DAY, 'Magnitude 7.2 earthquake hit SF Bay Area.'),
('Miami Hurricane Alpha', 3, 2, 'High', 'Active', NOW() - INTERVAL 1 DAY, 'Category 4 hurricane approaching coast.'),
('Houston Floods', 2, 3, 'Medium', 'Contained', NOW() - INTERVAL 5 DAY, 'Heavy rainfall causing severe flooding.');

-- Insert Relief Camps
INSERT INTO Relief_Camp (location_id, name, capacity, status) VALUES 
(1, 'SF Central High School', 500, 'Open'),
(1, 'Golden Gate Community Center', 200, 'Open'),
(2, 'Miami Arena Shelter', 1000, 'Open'),
(3, 'Houston Dome Camp', 2000, 'Open');

-- Insert Resource Types
INSERT INTO Resource_Type (category, unit) VALUES 
('Drinking Water', 'Liters'),
('Canned Food', 'Boxes'),
('Medical Kits', 'Packs'),
('Blankets', 'Items'),
('Tents', 'Items');

-- Insert Victims
INSERT INTO Victim (disaster_id, name, age, gender, medical_status) VALUES 
(1, 'John Doe', 45, 'M', 'Injured'),
(1, 'Jane Smith', 32, 'F', 'Healthy'),
(1, 'Bobby Brown', 10, 'M', 'Critical'),
(2, 'Alice Johnson', 28, 'F', 'Healthy'),
(3, 'Charlie Davis', 55, 'M', 'Injured');

-- Allocate Victims to Shelters (Triggers will run)
INSERT INTO Shelter_Allocation (victim_id, camp_id) VALUES 
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4);

-- Insert Resources (Using UPSERT through Stored Proc, or direct INSERT)
INSERT INTO Resource (type_id, camp_id, quantity) VALUES 
(1, 1, 5000), (2, 1, 2000), (3, 1, 500),
(1, 2, 1000), (4, 2, 200),
(1, 3, 10000), (2, 3, 5000), (5, 3, 500);

-- Insert Rescue Teams
INSERT INTO Rescue_Team (name, status, location_id) VALUES 
('Alpha Squad SF', 'Deployed', 1),
('Bravo Water Rescue', 'Available', 2),
('Charlie Medics', 'Deployed', 1);

-- Insert Rescue Personnel
INSERT INTO Rescue_Personnel (team_id, name, role) VALUES 
(1, 'Tom Hanks', 'Commander'),
(1, 'Chris Evans', 'Search & Rescue'),
(2, 'Scarlett Johansson', 'Diver'),
(3, 'Mark Ruffalo', 'Lead Medic');

-- Insert Volunteers
INSERT INTO Volunteer (name, phone, skills, status) VALUES 
('Sarah Connor', '555-0101', 'First Aid, Logistics', 'Available'),
('Ellen Ripley', '555-0102', 'Search, Driving', 'Available');

-- Assign Volunteer
INSERT INTO Volunteer_Assignment (volunteer_id, disaster_id, task_description) VALUES 
(1, 1, 'Coordinate supplies at SF Central');

-- Insert Emergency Request
INSERT INTO Emergency_Request (location_id, description, status) VALUES 
(1, 'Need immediate medical evac at 5th Ave', 'Pending'),
(2, 'Stranded family on roof', 'In Progress');
