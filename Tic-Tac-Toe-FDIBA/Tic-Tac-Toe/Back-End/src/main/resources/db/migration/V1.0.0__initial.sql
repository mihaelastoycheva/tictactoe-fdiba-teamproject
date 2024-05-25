begin;

CREATE TABLE game(
    id SERIAL,
    player1Id int,
    player2Id int,
    startTime TIMESTAMP,
    player1Symbol BOOL, -- X = true , O = false
    boardString varchar(20),
    primary key (id)
);

CREATE TABLE player(
    id SERIAL,
    "name" varchar(50),
    password_hash varchar(50),
    primary key (id)
);

commit;