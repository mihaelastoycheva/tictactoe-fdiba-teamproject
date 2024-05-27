-- Table: public.players

-- DROP TABLE IF EXISTS public.players;

CREATE TABLE IF NOT EXISTS public.players
(
    username text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    wins integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.players
    OWNER to postgres;