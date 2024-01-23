const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '913@mSm@@',
    database: 'mydb',
}).promise();

const getCourses = async() => {
  const [result] = await pool.query('select * from employees')
  return result
}

const getCourse = async(id) => {
  const [result] = await pool
    .query(`select * from employees 
                where employee_id=?` , [id])
  return result[0]
}
const insertCourse = async (title) => {
  const result = await pool
    .query(`insert into person(title)
                values(?)` ,
                [title])
  return result
}

const data = insertCourse('python')
.then((result) => console.log(result))
