ALTER TABLE admin_accounts
  ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'developer' AFTER email;

UPDATE admin_accounts
  SET role = 'owner'
  WHERE email = 'r.bishop00@icloud.com';
