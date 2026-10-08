CREATE TABLE volunteers (
    id TEXT PRIMARY KEY,
    registration_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    roll_number TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    program TEXT NOT NULL,
    department TEXT NOT NULL,
    year TEXT NOT NULL,
    section TEXT,
    ug_pg TEXT NOT NULL,
    interests TEXT NOT NULL, -- Stored as JSON string
    previous_experience TEXT,
    motivation TEXT NOT NULL,
    consent INTEGER NOT NULL, -- SQLite doesn't have a strict BOOLEAN type
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
