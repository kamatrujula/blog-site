const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog',
  password: 'rujulakamat',
  port: 5433,
})

const getProfile = (req, res) => {
    pool.query('SELECT * FROM profile', (error, results) => {
        if (error) {
            throw error;
          }
          res.status(200).json(results.rows);
        
    })
    };
    
const getUserById = (req, res) => {
        const id = parseInt(req.params.id);
    
        pool.query('SELECT * FROM profile WHERE id = $1', [id], (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
    }
    
const createUser = (req, res) => {
        const { name, username, password, tagline, description, email} = req.body
      
        pool.query('INSERT INTO profile (name, username, password, tagline, description, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, username, password, tagline, description, email], (error, results) => {
          if (error) {
            throw error
          }
          res.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
      }
    
const updateUser = (req, res) => {
        const id = parseInt(req.params.id)
        const { name, username, password, tagline, description, email} = req.body
      
        pool.query(
          'UPDATE profile SET name = $1, username = $2, password = $3, tagline = $4, description = $5, email = $6 WHERE id = $7',
          [name, username, password, tagline, description, email, id],
          (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).send(`User modified with ID: ${id}`)
          }
        )
      }
    
const deleteUser = (req, res) => {
        const id = parseInt(req.params.id)
      
        pool.query('DELETE FROM profile WHERE id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`User deleted with ID: ${id}`)
        })
      }


      module.exports = {
        getProfile,
        getUserById,
        createUser,
        updateUser,
        deleteUser
      }
