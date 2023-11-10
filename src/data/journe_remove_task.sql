DELETE FROM task
WHERE task_title = :_title OR task_id = :_id;