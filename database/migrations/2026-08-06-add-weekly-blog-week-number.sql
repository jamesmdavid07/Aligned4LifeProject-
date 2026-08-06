ALTER TABLE weekly_blogs
  ADD COLUMN week_number TINYINT UNSIGNED NULL AFTER publish_date;

INSERT INTO weekly_blogs (title, subtitle, image, content, publish_date, week_number)
VALUES
  (
    'Week 1: Channels',
    'Understanding the five love languages as the pathways through which love is communicated.',
    NULL,
    'This opening week introduces the foundation of the series by exploring how love is expressed and received in different ways. Rather than viewing the five love languages as the destination, we will see them as the starting point for deeper, Christ-centered relationships.\n\n**Topics Covered**\n\n1. Understanding the Five Love Languages and why they matter.\n2. Recognizing how people naturally give and receive love differently.\n3. Learning how intentional communication opens the door to stronger relationships.',
    '2026-08-09',
    1
  ),
  (
    'Week 2: Character',
    'Discovering how 1 Corinthians 13 defines the nature of genuine, Christlike love.',
    NULL,
    'Once we understand the channels of love, we move deeper into the character that sustains it. This week examines Paul''s description of love in 1 Corinthians 13 and how the Holy Spirit transforms our hearts to reflect Christ.\n\n**Topics Covered**\n\n1. Exploring the biblical qualities of love described in 1 Corinthians 13.\n2. Understanding the difference between emotional affection and Christlike character.\n3. Allowing God''s Spirit to shape patience, kindness, humility, and perseverance in everyday relationships.',
    '2026-08-16',
    2
  ),
  (
    'Week 3: Choices',
    'Learning how daily decisions shape both our relationships and our spiritual formation.',
    NULL,
    'Love is demonstrated through the choices we make every day. This week''s reflection focuses on practical decisions that strengthen relationships while also shaping our spiritual growth and discipleship.\n\n**Topics Covered**\n\n1. Choosing forgiveness over resentment.\n2. Developing habits of service, grace, and intentional love.\n3. Understanding how daily decisions influence both our relationships and our walk with Christ.',
    '2026-08-23',
    3
  ),
  (
    'Week 4: Commitment',
    'Exploring how covenant love reflects the unwavering faithfulness of Christ.',
    NULL,
    'The series concludes by examining commitment as the foundation of enduring relationships. Biblical love is more than emotion—it is a covenant that reflects the faithful and unchanging love of Christ for His people.\n\n**Topics Covered**\n\n1. Understanding the biblical meaning of covenant commitment.\n2. Remaining faithful through life''s changing seasons and challenges.\n3. Reflecting Christ''s unwavering love in our families, friendships, and communities.',
    '2026-08-30',
    4
  );
