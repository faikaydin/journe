-- nuking tables
drop table if exists task;
drop table if exists pot;
-- task
create table task (
  task_id text primary key,
  task_title text,
  task_duration integer,
  task_pot_id text,
  foreign key (task_pot_id) references pot(pot_id)
);
-- pots
create table pot (
  pot_id text primary key,
  pot_name text,
  pot_contents text[]
);

-- Insert the default pot entry
INSERT INTO pot (pot_id, pot_name, pot_contents) VALUES ('0', 'no_pot', NULL);
