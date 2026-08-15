-- Remove blog featured images entirely: clear the image column for all weekly blogs.
UPDATE weekly_blogs
SET image = NULL
WHERE image IS NOT NULL;
