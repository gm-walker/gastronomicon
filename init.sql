-- add tables to gastronomicon database

CREATE TABLE volume (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

CREATE TABLE weight (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

CREATE TABLE ingredients (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  description text,
  volume_id int,
  weight_id int,
  FOREIGN KEY (volume_id) REFERENCES volume(id),
  FOREIGN KEY (weight_id) REFERENCES weight(id)
);

CREATE TABLE pairings (
  ingredientA int NOT NULL,
  ingredientB int NOT NULL,
  PRIMARY KEY (ingredientA, ingredientB),
  FOREIGN KEY (ingredientA) REFERENCES ingredients(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredientB) REFERENCES ingredients(id) ON DELETE CASCADE
);

CREATE TABLE seasons (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

CREATE TABLE seasonality (
  ingredient int,
  season int,
  PRIMARY KEY (ingredient, season),
  FOREIGN KEY (ingredient) REFERENCES ingredients(id),
  FOREIGN KEY (season) REFERENCES seasons(id)
);

CREATE TABLE roles (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

CREATE TABLE ingredient_roles (
  ingredient int,
  role int,
  PRIMARY KEY (ingredient, role),
  FOREIGN KEY (ingredient) REFERENCES ingredients(id) ON DELETE CASCADE,
  FOREIGN KEY (role) REFERENCES roles(id)

);

CREATE TABLE tastes (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

CREATE TABLE ingredient_tastes (
  ingredient int NOT NULL,
  taste int NOT NULL,
  PRIMARY KEY (ingredient, taste),
  FOREIGN KEY (ingredient) REFERENCES ingredients(id) ON DELETE CASCADE,
  FOREIGN KEY (taste) REFERENCES tastes (id)
);


-- insert data into database

INSERT INTO tastes (name)
VALUES 
  ('salty'),
  ('sweet'),
  ('bitter'),
  ('sour'),
  ('umami');

INSERT INTO roles (name)
VALUES
  ('warming'),
  ('cooling');

INSERT INTO seasons (name)
VALUES
  ('spring'),
  ('summer'),
  ('fall'),
  ('winter')

INSERT INTO volume (name)
VALUES
  ('quiet'),
  ('quiet-moderate'),
  ('moderate'),
  ('moderate-loud'),
  ('loud'),

INSERT INTO weight (name)
VALUES
  ('light'),
  ('light-medium'),
  ('medium'),
  ('medium-heavy'),
  ('heavy'),
