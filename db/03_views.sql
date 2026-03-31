-- 03_views.sql
USE disaster_management;

-- Active Disasters View
CREATE OR REPLACE VIEW active_disasters_view AS
SELECT 
    d.id AS disaster_id,
    d.name AS disaster_name,
    dt.type_name,
    l.region,
    l.city,
    d.severity,
    d.status,
    d.date_reported
FROM Disaster d
JOIN Disaster_Type dt ON d.type_id = dt.id
JOIN Location l ON d.location_id = l.id
WHERE d.status = 'Active';

-- Victim Statistics View
CREATE OR REPLACE VIEW victim_statistics_view AS
SELECT 
    d.id AS disaster_id,
    d.name AS disaster_name,
    COUNT(v.id) AS total_victims,
    SUM(CASE WHEN v.medical_status = 'Safe' THEN 1 ELSE 0 END) AS safe_count,
    SUM(CASE WHEN v.medical_status = 'Injured' THEN 1 ELSE 0 END) AS injured_count,
    SUM(CASE WHEN v.medical_status = 'Critical' THEN 1 ELSE 0 END) AS critical_count,
    SUM(CASE WHEN v.medical_status = 'Missing' THEN 1 ELSE 0 END) AS missing_count,
    SUM(CASE WHEN v.medical_status = 'Deceased' THEN 1 ELSE 0 END) AS deceased_count
FROM Disaster d
LEFT JOIN Victim v ON d.id = v.disaster_id
GROUP BY d.id, d.name;

-- Resource Availability View
CREATE OR REPLACE VIEW resource_availability_view AS
SELECT 
    rc.id AS camp_id,
    rc.name AS camp_name,
    l.city AS camp_location,
    rt.category AS resource_type,
    r.quantity,
    rt.unit,
    r.last_updated
FROM Resource r
JOIN Relief_Camp rc ON r.camp_id = rc.id
JOIN Resource_Type rt ON r.type_id = rt.id
JOIN Location l ON rc.location_id = l.id;

-- Rescue Team Deployment View
CREATE OR REPLACE VIEW rescue_team_deployment_view AS
SELECT 
    rt.id AS team_id,
    rt.name AS team_name,
    rt.status AS team_status,
    l.city AS current_location,
    COUNT(rp.id) AS personnel_count
FROM Rescue_Team rt
LEFT JOIN Location l ON rt.location_id = l.id
LEFT JOIN Rescue_Personnel rp ON rt.id = rp.team_id
GROUP BY rt.id, rt.name, rt.status, l.city;

-- Relief Camp Capacity View
CREATE OR REPLACE VIEW relief_camp_capacity_view AS
SELECT 
    rc.id AS camp_id,
    rc.name AS camp_name,
    l.city AS log_city,
    rc.capacity AS total_capacity,
    COUNT(sa.id) AS current_occupancy,
    (rc.capacity - COUNT(sa.id)) AS available_space,
    rc.status
FROM Relief_Camp rc
JOIN Location l ON rc.location_id = l.id
LEFT JOIN Shelter_Allocation sa ON rc.id = sa.camp_id AND sa.date_discharged IS NULL
GROUP BY rc.id, rc.name, l.city, rc.capacity, rc.status;

-- Most Affected Areas View
CREATE OR REPLACE VIEW most_affected_areas_view AS
SELECT
    aa.id AS area_id,
    aa.region_name,
    aa.population_affected,
    d.id AS disaster_id,
    d.name AS disaster_name,
    d.severity
FROM Affected_Area aa
JOIN Disaster d ON aa.disaster_id = d.id
ORDER BY aa.population_affected DESC;

-- Resource Shortages View
-- Assume a simple logic where shortage occurs if a camp has high occupancy but low resources.
-- Alternatively, just show resources with quantity 0.
CREATE OR REPLACE VIEW resource_shortages_view AS
SELECT 
    rc.id AS camp_id,
    rc.name AS camp_name,
    rt.category AS resource_type,
    r.quantity
FROM Relief_Camp rc
JOIN Resource r ON rc.id = r.camp_id
JOIN Resource_Type rt ON r.type_id = rt.id
WHERE r.quantity <= 10;
