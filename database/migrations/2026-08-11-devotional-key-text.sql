ALTER TABLE devotionals
  CHANGE COLUMN full_key_verse key_text LONGTEXT NULL AFTER prayer,
  DROP COLUMN image;
