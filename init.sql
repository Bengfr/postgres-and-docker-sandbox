CREATE TABLE IF NOT EXISTS
    blog_users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
    );
 
CREATE TABLE IF NOT EXISTS
    blog_posts (
        post_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        post_title VARCHAR(100) NOT NULL,
        post_description VARCHAR(255) NOT NULL,
        post_content TEXT NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    blog_likes (
        like_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        liked_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

-- Fixing the foreign key constraints to match your table and column names
ALTER TABLE blog_posts
ADD CONSTRAINT blog_posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES blog_users (user_id) ON DELETE CASCADE;

ALTER TABLE blog_likes
ADD CONSTRAINT blog_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES blog_users (user_id) ON DELETE CASCADE;

ALTER TABLE blog_likes
ADD CONSTRAINT blog_likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES blog_posts (post_id) ON DELETE CASCADE;

ALTER TABLE blog_likes
ADD CONSTRAINT blog_likes_user_post_unique UNIQUE (user_id, post_id);

-- ####################################################################
-- # Basic INSERT statement
-- # See https://www.ibm.com/docs/en/db2-for-zos/13?topic=statements-insert for complete syntax.
-- ####################################################################
INSERT INTO blog_users (username, email, password_hash)
    VALUES ("Admin", "admin@mail.com", "Admin123")