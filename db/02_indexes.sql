-- 02_indexes.sql
USE disaster_management;

-- Disaster Location and Status Indexes
CREATE INDEX idx_disaster_location ON Disaster(location_id);
CREATE INDEX idx_disaster_status ON Disaster(status);

-- Victim Search and Tracking Indexes
CREATE INDEX idx_victim_name ON Victim(name);
CREATE INDEX idx_victim_disaster ON Victim(disaster_id);
CREATE INDEX idx_victim_status ON Victim(medical_status);

-- Resource Tracking Indexes
CREATE INDEX idx_resource_camp ON Resource(camp_id);

-- Rescue Team Assignment Indexes
CREATE INDEX idx_rescue_team_status ON Rescue_Team(status);
CREATE INDEX idx_personnel_team ON Rescue_Personnel(team_id);

-- Emergency Request Indexes
CREATE INDEX idx_emergency_status ON Emergency_Request(status);
CREATE INDEX idx_emergency_location ON Emergency_Request(location_id);
