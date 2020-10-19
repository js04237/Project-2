drop table marine_mammal;

Create table marine_mammal (
  id VARCHAR(100) not null,
  species VARCHAR (65),
  quantity NUMERIC,
  description VARCHAR (500),
  url VARCHAR (200),
  latitude DECIMAL,
  longitude DECIMAL,
  location VARCHAR,
  sighted_at date,
  created_at date,
  updated_at date),
  orca_type VARCHAR,
  orca_pod VARCHAR,
  primary key (id)
);  