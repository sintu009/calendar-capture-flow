
-- Update the existing admin user's email to admin@gmail.com
UPDATE auth.users 
SET email = 'admin@gmail.com'
WHERE email = 'admin';
