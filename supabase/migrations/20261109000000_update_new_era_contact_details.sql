INSERT INTO site_settings (key, value) VALUES
  ('contact_email', 'Neweraventures248@gmail.com'),
  ('contact_phone', '+234 808 521 5164'),
  ('social_twitter', 'https://x.com/newera_ven?s=11'),
  ('social_linkedin', 'https://www.linkedin.com/in/new-era-ventures-5145693b0?utm_source=share_via&utm_content=profile&utm_medium=member_ios')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
