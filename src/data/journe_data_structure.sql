-- nuking tables
drop table if exists task;
drop table if exists pot;
-- task
create table task (
  task_id text primary key,
  task_title text,
  task_duration integer,
  task_description text,
  task_pot_id text,
  task_block_id text,
  foreign key (task_pot_id) references pot(pot_id),
  foreign key (task_block_id) references block(block_id)
);
-- pot
create table pot (
  pot_id text primary key,
  pot_title text,
  pot_description text
);
-- block
create table block (
  block_id text primary key,
  block_start_time datetime,
  block_end_time datetime
);


-- Insert the default pot entry
INSERT INTO pot (pot_id, pot_title, pot_description) VALUES ('00000000-0000-0000-0000-000000000000',
                                                            'task_platter',
                                                            'a platter pot for unassigned tasks');
-- Insert the default block entry
INSERT INTO block (block_id, block_start_time, block_end_time) VALUES ('',
                                                            '0000-01-01 00:00:00',
                                                            '9999-12-31 23:59:59');
