UPDATE block
SET
    block_id = :block_id,
    block_start_time = :block_start_time,
    block_end_time = :block_end_time
WHERE block_id = :block_id;