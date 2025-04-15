-- Insert the categories
INSERT OR IGNORE INTO categories (name) VALUES ('funnyJoke');
INSERT OR IGNORE INTO categories (name) VALUES ('lameJoke');

-- Insert jokes for 'funnyJoke'
INSERT OR IGNORE INTO jokes (category_id, setup, delivery) 
VALUES ((SELECT id FROM categories WHERE name = 'funnyJoke'),
'Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!');

INSERT OR IGNORE INTO jokes (category_id, setup, delivery) 
VALUES ((SELECT id FROM categories WHERE name = 'funnyJoke'),
'What kind of tree fits in your hand?', 'A palm tree');

INSERT OR IGNORE INTO jokes (category_id, setup, delivery) 
VALUES ((SELECT id FROM categories WHERE name = 'funnyJoke'),
'What is worse than raining cats and dogs?', 'Hailing taxis');

-- Insert jokes for 'lameJoke'
INSERT OR IGNORE INTO jokes (category_id, setup, delivery) 
VALUES ((SELECT id FROM categories WHERE name = 'lameJoke'),
'Which bear is the most condescending?', 'Pan-DUH');

INSERT OR IGNORE INTO jokes (category_id, setup, delivery) 
VALUES ((SELECT id FROM categories WHERE name = 'lameJoke'),
'What would the Terminator be called in his retirement?', 'The Exterminator');
