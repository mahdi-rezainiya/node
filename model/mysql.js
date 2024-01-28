const pool = require('../utilities/mysql_database')

class CoursesModel {
  static getCourses = async() => {
    const [result] = await pool.query(`select * from person`)
    return result
  }
  
  static getCourse = async(id) => {
    const [result] = await pool.query(`select * from person
    where id = ?` , [id])
    return result[0]
  }
  
  static insertCourse = async (title) => {
    const result = await pool.query(`insert into person(title)
    values(?)` , [title])
    return {id : result.insertId , title : title}
  }
  
  static updateCourse = async(title , id) => {
    const [result] = await pool.query(`update person
    set title = ?
    where id = ?`,
    [title , id])
    return getCourse(id)
  }
  
  static deleteCourse = async(id) => {
    const [result] = await pool.query(`delete from person
    where id = ?` , [id])
    return result
  }
  
  static callStoredProcedure = async(id) => {
    const [result] = await pool.query(`call s_select(?)` , [id])
    return result[0]
  }
}
module.exports = CoursesModel ;