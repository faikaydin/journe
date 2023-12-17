UPDATE task
SET
    task_id = :task_id,
    task_block_id = :task_block_id,
    task_description = :task_description,
    task_duration = :task_duration,
    task_pot_id = :task_pot_id,
    task_title = :task_title
WHERE task_id = :task_id;