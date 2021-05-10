var mysql = [
  { id: 'insert_company', sql: 'INSERT INTO company_management (name,create_date,create_userid) VALUES (?)' },
  { id: 'update_company', sql: 'UPDATE company_management SET name=?,create_date=?,create_userid=? WHERE id=?' },
  { id: 'delete_company', sql: 'DELETE FROM company_management WHERE id=?' },
]

module.exports = mysql;