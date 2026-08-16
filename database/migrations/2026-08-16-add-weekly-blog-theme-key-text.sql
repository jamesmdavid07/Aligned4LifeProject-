ALTER TABLE weekly_blogs
  ADD COLUMN theme VARCHAR(255) NULL AFTER subtitle,
  ADD COLUMN key_text TEXT NULL AFTER theme;

UPDATE weekly_blogs
  SET theme = SUBSTRING_INDEX(SUBSTRING_INDEX(content, '[THEME]\n', -1), '\n\n', 1)
  WHERE content LIKE '[THEME]%';

UPDATE weekly_blogs
  SET key_text = SUBSTRING_INDEX(SUBSTRING_INDEX(content, '[KEY]\n', -1), '\n\n', 1)
  WHERE content LIKE '%[KEY]%';

UPDATE weekly_blogs
  SET content = REPLACE(
        content,
        CONCAT(
          '[THEME]\n',
          SUBSTRING_INDEX(SUBSTRING_INDEX(content, '[THEME]\n', -1), '\n\n', 1),
          '\n\n[KEY]\n',
          SUBSTRING_INDEX(SUBSTRING_INDEX(content, '[KEY]\n', -1), '\n\n', 1),
          '\n\n'
        ),
        ''
      )
  WHERE content LIKE '[THEME]%';
