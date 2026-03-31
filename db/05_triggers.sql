-- 05_triggers.sql
USE disaster_management;

DELIMITER //

-- 1. Trigger to Monitor Relief Camp Capacity (Update Status to Full)
CREATE TRIGGER trg_monitor_camp_capacity
AFTER INSERT ON Shelter_Allocation
FOR EACH ROW
BEGIN
    DECLARE v_current_occupancy INT;
    DECLARE v_total_capacity INT;
    
    -- Get current camp stats
    SELECT capacity, COUNT(sa.id) INTO v_total_capacity, v_current_occupancy
    FROM Relief_Camp c
    LEFT JOIN Shelter_Allocation sa ON c.id = sa.camp_id AND sa.date_discharged IS NULL
    WHERE c.id = NEW.camp_id
    GROUP BY c.capacity;
    
    -- If full, update status
    IF v_current_occupancy >= v_total_capacity THEN
        UPDATE Relief_Camp SET status = 'Full' WHERE id = NEW.camp_id;
    END IF;
END //

-- 2. Trigger to Re-open Camp when Victim is Discharged
CREATE TRIGGER trg_reopen_camp_capacity
AFTER UPDATE ON Shelter_Allocation
FOR EACH ROW
BEGIN
    DECLARE v_current_occupancy INT;
    DECLARE v_total_capacity INT;
    
    -- Check if someone was just discharged
    IF OLD.date_discharged IS NULL AND NEW.date_discharged IS NOT NULL THEN
        -- Get current camp stats
        SELECT capacity, COUNT(sa.id) INTO v_total_capacity, v_current_occupancy
        FROM Relief_Camp c
        LEFT JOIN Shelter_Allocation sa ON c.id = sa.camp_id AND sa.date_discharged IS NULL
        WHERE c.id = NEW.camp_id
        GROUP BY c.capacity;
        
        -- If it was full but now has space, Re-open
        IF v_current_occupancy < v_total_capacity THEN
             UPDATE Relief_Camp SET status = 'Open' WHERE id = NEW.camp_id AND status = 'Full';
        END IF;
    END IF;
END //

-- 3. Trigger to Auto-update Victim status in Communication Log (Creating Table on the fly assuming it's needed)
CREATE TABLE IF NOT EXISTS Communication_Log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    victim_id INT NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (victim_id) REFERENCES Victim(id) ON DELETE CASCADE
);

CREATE TRIGGER trg_log_victim_status
AFTER UPDATE ON Victim
FOR EACH ROW
BEGIN
    IF OLD.medical_status <> NEW.medical_status THEN
        INSERT INTO Communication_Log (victim_id, previous_status, new_status)
        VALUES (NEW.id, OLD.medical_status, NEW.medical_status);
    END IF;
END //

-- 4. Trigger to record Volunteer Status Change when Assigned
CREATE TRIGGER trg_volunteer_assignment
AFTER INSERT ON Volunteer_Assignment
FOR EACH ROW
BEGIN
    UPDATE Volunteer SET status = 'Assigned' WHERE id = NEW.volunteer_id;
END //

-- 5. Trigger to record Volunteer Status Change when Unassigned
CREATE TRIGGER trg_volunteer_unassignment
AFTER UPDATE ON Volunteer_Assignment
FOR EACH ROW
BEGIN
    IF NEW.end_date IS NOT NULL AND OLD.end_date IS NULL THEN
        UPDATE Volunteer SET status = 'Available' WHERE id = NEW.volunteer_id;
    END IF;
END //

DELIMITER ;
