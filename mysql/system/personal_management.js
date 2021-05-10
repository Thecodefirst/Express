var mysql = [
  { id: 'insert_personal', sql: 'INSERT INTO personal_management (num,company_id,file_num,name,department,jobs,grades,gender,nation,date_birth,idcard,tel,marital,education,graduate_institutions,major,hiredate,probation,positive,politics_status,working_state,departure_date,account_type,take_job_date,present_address,contract_over_date,bank_deposit,card_no,payment_information,create_date,update_date,create_userid,dd_userid,del) VALUES (?)' },
  { id: 'update_personal', sql: 'UPDATE personal_management SET num=?,company_id=?,file_num=?,name=?,department=?,jobs=?,grades=?,gender=?,nation=?,date_birth=?,idcard=?,tel=?,marital=?,education=?,graduate_institutions=?,major=?,hiredate=?,probation=?,positive=?,politics_status=?,working_state=?,departure_date=?,account_type=?,take_job_date=?,present_address=?,contract_over_date=?,bank_deposit=?,card_no=?,payment_information=?,create_date=?,update_date=?,create_userid=?,dd_userid=?,del=? WHERE id=?' },
  { id: 'delete_personal', sql: 'UPDATE personal_management SET update_date=?,create_userid=?,del=? WHERE id=?' },
]

module.exports = mysql;