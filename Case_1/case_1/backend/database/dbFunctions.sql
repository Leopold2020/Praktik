CREATE OR REPLACE FUNCTION login(sentEmail VARCHAR, sentPassword VARCHAR) RETURNS SETOF account AS $$
    BEGIN
        RETURN QUERY SELECT * FROM account WHERE quote_literal(email) = quote_literal(sentEmail) 
        AND quote_literal(password) = quote_literal(sentPassword) LIMIT 1;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertAccount(
    sentFirstname VARCHAR, 
    sentLastname VARCHAR, 
    sentEmail VARCHAR, 
    sentPassword VARCHAR, 
    sentPhone VARCHAR, 
    sentRole role, 
    sentBank_clering VARCHAR, 
    sentBank_number VARCHAR
) RETURNS SETOF account AS $$
    BEGIN
        RETURN QUERY INSERT INTO account(
            firstname, 
            lastname, 
            email, 
            password, 
            phone, 
            assigned_role, 
            bank_clering, 
            bank_number
        ) VALUES(
            sentFirstname, 
            sentLastname, 
            sentEmail, 
            sentPassword, 
            sentPhone, 
            sentRole, 
            sentBank_clering, 
            sentBank_number
        ) RETURNING *;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION updateAccount(
    sentId INTEGER,
    sentFirstname VARCHAR, 
    sentLastname VARCHAR, 
    sentEmail VARCHAR, 
    sentPassword VARCHAR, 
    sentPhone VARCHAR, 
    sentRole role, 
    sentBank_clering VARCHAR, 
    sentBank_number VARCHAR
) RETURNS SETOF account AS $$
    BEGIN
        RETURN QUERY UPDATE account SET
            firstname = sentFirstname,
            lastname = sentLastname,
            email = sentEmail,
            password = sentPassword,
            phone = sentPhone,
            assigned_role = sentRole,
            bank_clering = sentBank_clering,
            bank_number = sentBank_number
        WHERE id = sentId RETURNING *;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertMatch(
    sentDate TIMESTAMP, 
    sentLocation VARCHAR, 
    sentField VARCHAR, 
    sentTeam_1 VARCHAR, 
    sentTeam_2 VARCHAR
) RETURNS SETOF match AS $$
    BEGIN
        RETURN QUERY INSERT INTO match(
            date, 
            location, 
            field, 
            TEAM_1, 
            TEAM_2
        ) VALUES(
            sentDate, 
            sentLocation, 
            sentField, 
            sentTeam_1, 
            sentTeam_2
        ) RETURNING *;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION updateMatch(
    sentId INTEGER,
    sentDate TIMESTAMP,
    sentLocation VARCHAR,
    sentField VARCHAR,
    sentTeam_1 VARCHAR,
    sentTeam_2 VARCHAR
) RETURNS SETOF match AS $$
    BEGIN
        RETURN QUERY UPDATE match SET
            date = sentDate,
            location = sentLocation,
            field = sentField,
            TEAM_1 = sentTeam_1,
            TEAM_2 = sentTeam_2
        WHERE id = sentId RETURNING *;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION filterMatch(
    sentDate VARCHAR,
    sentLocation VARCHAR,
    sentField VARCHAR,
    sentTeam_1 VARCHAR,
    sentTeam_2 VARCHAR
) RETURNS SETOF match AS $$
    BEGIN
        RETURN QUERY SELECT * FROM match WHERE date::text LIKE '%' || sentDate::text || '%' 
        AND location lIKE '%' || sentLocation || '%'
        AND field LIKE '%' || sentField || '%'
        AND TEAM_1 LIKE  '%' || sentTeam_1 || '%'
        AND TEAM_2 LIKE '%' || sentTeam_2 || '%';
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertAssignment(
    sentMatch_id INTEGER, 
    sentAccount_id INTEGER, 
    sentAccount_role assignment_role
) RETURNS SETOF assignment AS $$
    BEGIN
        RETURN QUERY INSERT INTO assignment(
            match_id, 
            account_id, 
            account_role
        ) VALUES(
            sentMatch_id, 
            sentAccount_id, 
            sentAccount_role
        ) RETURNING *;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION assignementConfirmChange(
    sentId INTEGER,
    sentStatus BOOLEAN
) RETURNS SETOF assignment AS $$
    BEGIN
        RETURN QUERY UPDATE assignment SET
            account_confirm = sentStatus
        WHERE id = sentId RETURNING *;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION assignementNoticeChange(
    sentId INTEGER,
    sentStatus BOOLEAN
) RETURNS SETOF assignment AS $$
    BEGIN
        RETURN QUERY UPDATE assignment SET
            account_notice = sentStatus
        WHERE id = sentId RETURNING *;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION assignementOnSiteChange(
    sentId INTEGER,
    sentStatus BOOLEAN
) RETURNS SETOF assignment AS $$
    BEGIN
        RETURN QUERY UPDATE assignment SET
            account_on_site = sentStatus
        WHERE id = sentId RETURNING *;
    END;
$$ LANGUAGE plpgsql;