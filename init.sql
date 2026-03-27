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
  FOREIGN KEY (volume_id) REFERENCES volume(id),
  weight_id int,
  FOREIGN KEY (weight_id) REFERENCES weight(id)
);

CREATE TABLE pairings (
  ingredientA int NOT NULL,
  FOREIGN KEY (ingredientA) REFERENCES ingredients(id),
  ingredientB int NOT NULL,
  FOREIGN KEY (ingredientB) REFERENCES ingredients(id)
);

CREATE TABLE seasons (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

CREATE TABLE seasonality (
  ingredient int,
  FOREIGN KEY (ingredient) REFERENCES ingredients(id),
  season int,
  FOREIGN KEY (season) REFERENCES seasons(id)
);

CREATE TABLE roles (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name character(16)
);

CREATE TABLE ingredient_roles (
  ingredient int,
  FOREIGN KEY (ingredient) REFERENCES ingredients(id),
  role int,
  FOREIGN KEY (role) REFERENCES roles(id)

);

CREATE TABLE tastes (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

CREATE TABLE ingredient_tastes (
  ingredient int,
  FOREIGN KEY (ingredient) REFERENCES ingredients(id),
  taste int,
  FOREIGN KEY (taste) REFERENCES tastes (id)
);


-- insert data into database
