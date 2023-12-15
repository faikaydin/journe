UPDATE pot
SET
    pot_id = :pot_id,
    pot_title = :pot_title,
    pot_description = :pot_description
WHERE pot_id = :pot_id;