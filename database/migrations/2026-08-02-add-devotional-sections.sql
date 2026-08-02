ALTER TABLE devotionals
  ADD COLUMN ellen_white_insight TEXT NULL AFTER content,
  ADD COLUMN todays_declaration TEXT NULL AFTER reflection,
  ADD COLUMN appeal TEXT NULL AFTER todays_declaration,
  ADD COLUMN full_key_verse TEXT NULL AFTER prayer;
