-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    UserId SERIAL PRIMARY KEY,
    PasswordHash VARCHAR(255) NOT NULL, -- Store password hashes
    Email VARCHAR(255) UNIQUE,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Priorities table
CREATE TABLE IF NOT EXISTS Priorities (
    PriorityId INT PRIMARY KEY,
    PriorityName VARCHAR(50) NOT NULL
);

-- Insert default priorities (if they don't exist)
INSERT INTO Priorities (PriorityId, PriorityName) VALUES
(1, 'High'),
(2, 'Medium'),
(3, 'Low')
ON CONFLICT DO NOTHING;


-- Create the TaskStatuses table
CREATE TABLE IF NOT EXISTS TaskStatuses (
    StatusId INT PRIMARY KEY,
    StatusName VARCHAR(50) NOT NULL
);

-- Insert default statuses (if they don't exist)
INSERT INTO TaskStatuses (StatusId, StatusName) VALUES
(1, 'Pending'),
(2, 'In Progress'),
(3, 'Completed')
ON CONFLICT DO NOTHING; -- Handles cases where the values are already there

-- Create the Tasks table
CREATE TABLE IF NOT EXISTS Tasks (
    TaskId SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT, -- Add a description field
    DueDate DATE NOT NULL,
    AssigneeId INT REFERENCES Users(UserId), -- Foreign key to Users table
    PriorityId INT REFERENCES Priorities(PriorityId), -- Foreign key to Priorities table
    StatusId INT REFERENCES TaskStatuses(StatusId), -- Foreign key to TaskStatuses table
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the task was created
    UpdatedAt TIMESTAMP -- When the task was last updated
);

-- Example of adding an index for faster lookups (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_tasks_duedate ON Tasks (DueDate);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON Tasks (AssigneeId);