INSERT INTO account(username, password, email, phone, assigned_role, bank_clering, bank_number) VALUES('referee', 'referee', 'ref@test', '1234', 'referee', '1234', '1234');
INSERT INTO account(username, password, email, phone, assigned_role, bank_clering, bank_number) VALUES('referee2', 'referee2', 'ref2@test', '1234', 'referee', '1234', '1234');

INSERT INTO account(username, password, email, phone, assigned_role, bank_clering, bank_number) VALUES('coach', 'coach', 'coach@test', '1234', 'coach', '1234', '1234');

INSERT INTO match(date, location, field, TEAM_1, TEAM_2) VALUES('2024-10-13 10:00:00', 'some location', 'some field', 'team1', 'team2');

INSERT INTO assignment(match_id, account_id, account_role) VALUES(10, 15, 'coach');

SELECT * FROM match WHERE location LIKE '%some%' and date::text LIKE '%10:13%';

SELECT account.username, account.email, account.phone, account.assigned_role
FROM (assignment
INNER JOIN account ON assignment.account_id = account.id)
WHERE assignment.match_id = 1 AND assignment.account_confirm = TRUE;
