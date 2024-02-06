CREATE DATABASE booff;

CREATE TABLE admin(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    bank_clering VARCHAR(100),
    bank_number VARCHAR(100)
);

CREATE TABLE referee(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    bank_clering VARCHAR(100) NOT NULL,
    bank_number VARCHAR(100) NOT NULL
);

CREATE TABLE match(
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    field VARCHAR(255),
    TEAM_1 VARCHAR(255) NOT NULL,
    TEAM_2 VARCHAR(255) NOT NULL
);

CREATE TABLE assignment(
    id SERIAL PRIMARY KEY,
    match_id INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    FOREIGN KEY(match_id) REFERENCES match(id),
    FOREIGN KEY(account_id) REFERENCES referee(id),
    referee_confirm BOOLEAN NOT NULL DEFAULT FALSE,
    referee_notice BOOLEAN NOT NULL DEFAULT FALSE,
    referee_on_site BOOLEAN NOT NULL DEFAULT FALSE,
    referee_paid BOOLEAN NOT NULL DEFAULT FALSE,
    paid_amount NUMERIC(100) DEFAULT 0
);

INSERT INTO admin(username, password, email, phone, bank_clering, bank_number) VALUES('admin', 'admin', 'admin@secret', '1234', '1234', '1234');