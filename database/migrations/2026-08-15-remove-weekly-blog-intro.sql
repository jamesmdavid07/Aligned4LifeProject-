-- Remove the series Introduction post (id = 1, week_number NULL) from the blog.
-- Scoped to week_number IS NULL so it can never remove a numbered weekly reflection.
DELETE FROM weekly_blogs
WHERE id = 1 AND week_number IS NULL;
