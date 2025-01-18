const db = require('../config/database');

// Get all users
exports.getAllUsers = async (req, res) => {
  const query = `
    SELECT 
      user_id, 
      user_name, 
      email
    FROM 
      user
  `;

  try {
    const [users] = await db.query(query);

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Get user details by user ID, including followers and following
exports.getUserById = async (req, res) => {
  const user_id = parseInt(req.params.user_id, 10);
  // Queries
  const userDetailsQuery = `
    SELECT 
      u.user_id, 
      u.user_name, 
      u.email
    FROM 
      user u
    WHERE 
      u.user_id = ?
  `;

  const followersQuery = `
    SELECT 
      f.follower_id AS user_id, 
      u.user_name, 
      u.email
    FROM 
      follow f
    JOIN 
      user u 
    ON 
      f.follower_id = u.user_id
    WHERE 
      f.following_id = ?
  `;

  const followingQuery = `
    SELECT 
      f.following_id AS user_id, 
      u.user_name, 
      u.email
    FROM 
      follow f
    JOIN 
      user u 
    ON 
      f.following_id = u.user_id
    WHERE 
      f.follower_id = ?
  `;

  try {
    // Execute queries
    const [[user]] = await db.query(userDetailsQuery, [user_id]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [followers] = await db.query(followersQuery, [user_id]);
    const [following] = await db.query(followingQuery, [user_id]);

    // Construct response
    res.status(200).json({
      user,
      followers,
      following,
    });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
