var mysql = [
  { id: 'insert_jobs', sql: 'INSERT INTO jobs_management (name,create_date,create_userid) VALUES (?)' },
  { id: 'update_jobs', sql: 'UPDATE jobs_management SET name=?,create_date=?,create_userid=? WHERE id=?' },
  { id: 'delete_jobs', sql: 'DELETE FROM jobs_management WHERE id=?' }
]

module.exports = mysql;