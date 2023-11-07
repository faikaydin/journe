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
  pot_title text,
  pot_description text
);

-- Insert the default pot entry
INSERT INTO pot (pot_id, pot_title, pot_description) VALUES ('00000000-0000-0000-0000-000000000000',
                                                            'task_platter',
                                                            'a platter pot for unassigned tasks');
