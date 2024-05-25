begin;

    ALTER TABLE player ADD COLUMN gamesPlayed INTEGER DEFAULT 0;
    ALTER TABLE player ADD COLUMN gamesWon INTEGER DEFAULT 0;

commit;