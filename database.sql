CREATE TABLE greeted(
    id serial not null primary key,
    username VARCHAR(255),
    greet_count DECIMAL(10,0)
);