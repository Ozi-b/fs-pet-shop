DROP TABLE IF EXISTS pets CASCADE;

CREATE TABLE pets (
  id serial,
  age int,
  kind VARCHAR,
  name VARCHAR
);