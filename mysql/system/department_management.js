var mysql = [
  { id: 'insert_department', sql: 'INSERT INTO department_management (name,create_date,create_userid) VALUES (?)' },
  { id: 'update_department', sql: 'UPDATE department_management SET name=?,create_date=?,create_userid=? WHERE id=?' },
  { id: 'delete_department', sql: 'DELETE FROM department_management WHERE id=?' }
]

module.exports = mysql;