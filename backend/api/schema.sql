DROP TABLE IF EXISTS bank;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS request;

CREATE TABLE bank (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  UID TEXT UNIQUE NOT NULL,
  name TEXT UNIQUE NOT NULL,
  location TEXT
);

INSERT INTO bank (name, location, UID) VALUES ('Glacier Bank','Kalispell, MT','ee8b5a90-76ac-467a-be85-b976a0b57706');
INSERT INTO bank (name, location, UID) VALUES ('First Interstate Bank','Whitefish, MT','9ce338af-f1cc-460e-8ed3-34188ac55e57');

CREATE TABLE member (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  UID TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO member (first_name, last_name, is_admin, uid) VALUES ('Thomas', 'Randall',0,'b07e4d77-e384-4afd-8a8d-fee70d3e3e32');
INSERT INTO member (first_name, last_name, is_admin, uid) VALUES ('Kaleb', 'Porter',1,'012b2865-7294-4013-9198-e35feaa401cf');

CREATE TABLE request (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reason TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    member_id INTEGER NOT NULL,
    trans_date datetime default current_timestamp,
    account_number NUMERIC NOT NULL,
    status TEXT NOT NULL default "Pending",
    FOREIGN KEY (member_id) REFERENCES member (id)
);

INSERT INTO request (reason, amount, member_id, account_number) VALUES ('Bus fare',5.65,1,165432);
INSERT INTO request (reason, amount, member_id, account_number) VALUES ('Subway fare',15.65,1,165432);
INSERT INTO request (reason, amount, member_id, account_number) VALUES ('AirBnB',145.65,1,165432);