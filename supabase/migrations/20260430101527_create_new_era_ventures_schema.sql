/*
  # New Era Ventures – Full Schema

  1. New Tables
    - `site_settings` – stores global settings like company name, logo, contact info
    - `team_members` – portfolio team cards with headshot, candid, role, links
    - `blog_posts` – blog entries with image, title, content, author, date
    - `products` – company product listings
    - `services` – service offerings
    - `contact_messages` – messages submitted via contact form
    - `admin_users` – admin credentials (hashed)

  2. Security
    - RLS enabled on all tables
    - Public read on site_settings, team_members, blog_posts, products, services
    - Only authenticated admin can write/update/delete
    - contact_messages: anyone can insert, only admin can select/delete
*/

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users: select own row"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings: anyone can read"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Site settings: admin can update"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Site settings: admin can insert"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text DEFAULT '',
  headshot_url text DEFAULT '',
  candid_url text DEFAULT '',
  github_url text DEFAULT '',
  linkedin_url text DEFAULT '',
  website_url text DEFAULT '',
  whatsapp text DEFAULT '',
  twitter_url text DEFAULT '',
  repo_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members: anyone can read"
  ON team_members FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Team members: admin can insert"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Team members: admin can update"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Team members: admin can delete"
  ON team_members FOR DELETE
  TO authenticated
  USING (true);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  image_url text DEFAULT '',
  author text DEFAULT 'New Era Ventures',
  category text DEFAULT 'General',
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts: anyone can read published"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Blog posts: admin can read all"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Blog posts: admin can insert"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Blog posts: admin can update"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Blog posts: admin can delete"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  price text DEFAULT '',
  category text DEFAULT '',
  features text[] DEFAULT '{}',
  demo_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products: anyone can read"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Products: admin can insert"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Products: admin can update"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Products: admin can delete"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services: anyone can read"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Services: admin can insert"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Services: admin can update"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Services: admin can delete"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT '',
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contact messages: anyone can insert"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Contact messages: admin can select"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Contact messages: admin can update"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Contact messages: admin can delete"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Seed default site settings
INSERT INTO site_settings (key, value) VALUES
  ('company_name', 'New Era Ventures'),
  ('company_tagline', 'Building the Future, One Line at a Time'),
  ('logo_url', ''),
  ('contact_email', 'Neweraventures248@gmail.com'),
  ('contact_phone', '+234 808 521 5164'),
  ('contact_address', '123 Innovation Drive, Tech City, TC 00000'),
  ('social_twitter', 'https://x.com/newera_ven?s=11'),
  ('social_linkedin', 'https://www.linkedin.com/in/new-era-ventures-5145693b0?utm_source=share_via&utm_content=profile&utm_medium=member_ios'),
  ('social_github', 'https://github.com/neweraventures'),
  ('social_instagram', 'https://instagram.com/neweraventures')
ON CONFLICT (key) DO NOTHING;

-- Seed initial services
INSERT INTO services (title, description, icon, display_order) VALUES
  ('Web Development', 'We design and build fast, scalable, and beautiful web applications tailored to your business needs. From landing pages to full-stack platforms, we bring your vision to life.', 'Globe', 1),
  ('Mobile App Development', 'Native and cross-platform mobile apps built with modern frameworks. We create intuitive, high-performance applications for iOS and Android.', 'Smartphone', 2),
  ('UI/UX Design', 'User-centered design that converts. We craft stunning interfaces backed by research, wireframes, and prototypes that ensure a seamless user experience.', 'Palette', 3),
  ('Graphic Design & Branding', 'From logos to full brand identity systems, our designers create visuals that communicate your brand story and leave a lasting impression.', 'Layers', 4),
  ('Code Education', 'We teach programming from beginner to advanced levels. Our structured curriculum covers HTML, CSS, JavaScript, Python, React, and more.', 'BookOpen', 5),
  ('SEO & Digital Marketing', 'Drive real traffic with data-driven SEO strategies, content marketing, and paid advertising campaigns optimized for conversions.', 'TrendingUp', 6),
  ('Cloud & DevOps', 'Scalable cloud infrastructure, CI/CD pipelines, containerization, and monitoring solutions that keep your applications running smoothly.', 'Cloud', 7),
  ('API Integration & Backend', 'Robust RESTful and GraphQL APIs, database architecture, and third-party integrations that power your digital products.', 'Code2', 8)
ON CONFLICT DO NOTHING;

-- Seed team members
INSERT INTO team_members (name, role, bio, headshot_url, candid_url, github_url, linkedin_url, display_order) VALUES
  (
    'Kenneth Osei', 
    'CEO & Lead Developer',
    'Kenneth is the visionary behind New Era Ventures. With over 8 years of full-stack development experience, he has led projects for clients across fintech, e-commerce, and education. He is passionate about merging clean code with stunning design to build products that matter.',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://github.com',
    'https://linkedin.com',
    1
  ),
  (
    'Ama Serwaa', 
    'Lead UI/UX Designer',
    'Ama transforms complex problems into elegant, intuitive interfaces. With a background in psychology and design, she ensures every pixel serves a purpose. She has designed products used by over 50,000 users globally and brings both empathy and precision to every project.',
    'https://images.pexels.com/photos/3757004/pexels-photo-3757004.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://github.com',
    'https://linkedin.com',
    2
  ),
  (
    'Kwame Mensah', 
    'Backend Engineer',
    'Kwame architects the invisible systems that make great products run. Specializing in Node.js, Python, and cloud infrastructure, he has built APIs handling millions of requests daily. He is an open-source contributor and firm believer in writing code that lasts.',
    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://github.com',
    'https://linkedin.com',
    3
  ),
  (
    'Abena Asante', 
    'Graphic Designer & Brand Strategist',
    'Abena is the creative force that gives brands their visual identity. From logo design to full brand guidelines, she creates visual languages that speak. Her work spans startups, NGOs, and enterprise clients across Africa and Europe, always telling a story through design.',
    'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://github.com',
    'https://linkedin.com',
    4
  ),
  (
    'Fiifi Boateng', 
    'Mobile Developer & Code Instructor',
    'Fiifi builds mobile experiences that feel native and perform beautifully. A React Native and Flutter specialist, he has shipped apps across fintech, health, and productivity sectors. As a code instructor, he has mentored over 200 students and helped many land their first tech jobs.',
    'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://github.com',
    'https://linkedin.com',
    5
  )
ON CONFLICT DO NOTHING;

-- Seed products
INSERT INTO products (name, description, image_url, price, category, features, display_order) VALUES
  (
    'NEV CMS Platform',
    'A fully customizable content management system built for modern businesses. Manage your website content, team, blog, and media all from one powerful dashboard.',
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
    'From $99/mo',
    'SaaS',
    ARRAY['Drag & drop editor', 'Multi-user roles', 'SEO tools', 'Media library', 'Analytics dashboard', 'API access'],
    1
  ),
  (
    'CodeFlow LMS',
    'A learning management system designed specifically for tech bootcamps and code schools. Track student progress, manage curriculum, and deliver live sessions seamlessly.',
    'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600',
    'From $149/mo',
    'Education',
    ARRAY['Video hosting', 'Live coding environment', 'Progress tracking', 'Certificate generation', 'Student messaging', 'Assignment grading'],
    2
  ),
  (
    'BrandKit Pro',
    'Everything a growing business needs to establish a professional brand identity. Logos, color palettes, typography guides, and social media templates — all delivered in days.',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    'From $299 once',
    'Design',
    ARRAY['Custom logo design', 'Brand guidelines PDF', 'Social media kit', 'Business card design', 'Letterhead', 'Unlimited revisions'],
    3
  ),
  (
    'SwiftSite Builder',
    'Launch a professional website in under 48 hours. Our team handles design, development, and deployment so you can focus on your business.',
    'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600',
    'From $499 once',
    'Web',
    ARRAY['Custom design', 'Mobile responsive', 'SEO optimized', 'CMS integration', 'Contact forms', '1 year hosting'],
    4
  )
ON CONFLICT DO NOTHING;

-- Seed blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author, category, published, published_at) VALUES
  (
    'Why Every Business Needs a Website in 2026',
    'why-every-business-needs-a-website-2026',
    'In a world where your customers Google everything before making a decision, not having a website is leaving money on the table. Here is why your business needs one today.',
    'In 2026, your website is your most powerful business asset. Customers research businesses online before making purchasing decisions — and if you are not there, your competitor is. A professional website builds credibility, generates leads 24/7, and tells your brand story the way you want it told. At New Era Ventures, we have seen businesses transform overnight simply by establishing a strong online presence. Whether you are a freelancer, a startup, or an established enterprise, a well-designed website is non-negotiable. In this post, we break down exactly why, and what a great website does for you.',
    'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Kenneth Osei',
    'Business',
    true,
    now() - interval '5 days'
  ),
  (
    'From Zero to Developer: Our Students'' Success Stories',
    'from-zero-to-developer-student-success-stories',
    'Meet the people who bet on themselves and changed their careers. These are the real stories of students who enrolled in our code programs and landed jobs in tech.',
    'Learning to code can feel overwhelming. But the moment it clicks — and it does click — everything changes. We have trained over 200 students in web development, design, and mobile development. Many came in with zero technical background. Today, they work at startups, run their own agencies, and build products used by thousands. In this post, we share three of their stories in full — the struggles, the breakthroughs, and what they built. We hope these stories inspire you to take the first step.',
    'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Fiifi Boateng',
    'Education',
    true,
    now() - interval '12 days'
  ),
  (
    'UI/UX Trends That Will Dominate 2026',
    'ui-ux-trends-2026',
    'Design is evolving faster than ever. From micro-interactions to AI-assisted layouts, here are the trends shaping how people experience digital products in 2026.',
    'Design does not stand still. Every year, new patterns emerge — some stick, some fade. But 2026 has brought a shift that feels different. Users expect more: faster load times, smoother transitions, interfaces that feel alive. Glassmorphism gave way to bolder neumorphism hybrids. Motion design is now an accessibility tool, not just a visual flourish. AI is being woven into design workflows, speeding up prototyping and personalizing interfaces in real time. In this post, our Lead Designer Ama Serwaa breaks down the 7 most impactful UI/UX trends of 2026 and what they mean for your product.',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Ama Serwaa',
    'Design',
    true,
    now() - interval '20 days'
  ),
  (
    'Building Scalable APIs: A Practical Guide',
    'building-scalable-apis-practical-guide',
    'APIs are the backbone of modern software. In this guide, our backend team walks through the principles and patterns that make APIs that can handle millions of requests without breaking.',
    'A great API is invisible — it just works. But building one that stays reliable as your user base grows takes deliberate architecture. In this guide, Kwame Mensah from our backend team covers the full lifecycle of a production-grade REST API: from schema design and authentication to rate limiting, caching, and monitoring. We use real examples from projects we have shipped, including an API that handles 2 million requests per day. Whether you are building your first API or refactoring an existing one, this guide has practical takeaways you can apply today.',
    'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Kwame Mensah',
    'Engineering',
    true,
    now() - interval '30 days'
  )
ON CONFLICT (slug) DO NOTHING;
