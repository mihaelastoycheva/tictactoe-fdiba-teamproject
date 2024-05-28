begin;
    CREATE TYPE "state" AS ENUM ('ONGOING', 'TIE', 'PLAYER1_WON', 'PLAYER2_WON');
    ALTER TABLE game ADD COLUMN gameState "state";

commit;