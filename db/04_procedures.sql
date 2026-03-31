-- 04_procedures.sql
USE disaster_management;

DELIMITER //

-- Procedure to Register a New Disaster
CREATE PROCEDURE sp_register_disaster(
    IN p_name VARCHAR(150),
    IN p_type_id INT,
    IN p_location_id INT,
    IN p_severity ENUM('Low', 'Medium', 'High', 'Critical'),
    IN p_description TEXT
)
BEGIN
    INSERT INTO Disaster (name, type_id, location_id, severity, status, date_reported, description)
    VALUES (p_name, p_type_id, p_location_id, p_severity, 'Active', NOW(), p_description);
    
    SELECT LAST_INSERT_ID() AS new_disaster_id;
END //

-- Procedure to Assign a Rescue Team to a Disaster Area (by updating location)
CREATE PROCEDURE sp_assign_rescue_team(
    IN p_team_id INT,
    IN p_disaster_id INT
)
BEGIN
    DECLARE v_disaster_location INT;
    
    -- Get disaster location
    SELECT location_id INTO v_disaster_location 
    FROM Disaster 
    WHERE id = p_disaster_id;
    
    -- Update Rescue Team Status and Location
    UPDATE Rescue_Team 
    SET status = 'Deployed', location_id = v_disaster_location
    WHERE id = p_team_id;
    
    SELECT ROW_COUNT() AS teams_assigned;
END //

-- Procedure to Allocate Resources
CREATE PROCEDURE sp_allocate_resources(
    IN p_camp_id INT,
    IN p_type_id INT,
    IN p_quantity INT
)
BEGIN
    -- Insert or Update resource quantity using UPSERT
    INSERT INTO Resource (type_id, camp_id, quantity)
    VALUES (p_type_id, p_camp_id, p_quantity)
    ON DUPLICATE KEY UPDATE quantity = quantity + p_quantity;
    
    SELECT ROW_COUNT() AS resources_allocated;
END //

-- Procedure to Transfer Victim to Camp
CREATE PROCEDURE sp_transfer_victim(
    IN p_victim_id INT,
    IN p_camp_id INT
)
BEGIN
    DECLARE v_camp_status ENUM('Open', 'Full', 'Closed');
    
    -- Check if camp is open
    SELECT status INTO v_camp_status 
    FROM Relief_Camp 
    WHERE id = p_camp_id;
    
    IF v_camp_status = 'Open' THEN
        -- Add to shelter allocation
        INSERT INTO Shelter_Allocation (victim_id, camp_id)
        VALUES (p_victim_id, p_camp_id);
        
        -- The trigger trg_monitor_camp_capacity will handle marking it full if capacity is reached
        SELECT 'Success' AS result;
    ELSE
        SELECT 'Failed - Camp is not Open' AS result;
    END IF;
END //

DELIMITER ;
