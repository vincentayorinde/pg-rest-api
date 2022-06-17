import pkg from 'pg'

export const pool = new pkg.Pool({
	user: 'postgres',
	password: 'password@1',
	database: 'todo_database',
	host: 'localhost',
	post: 5432,
})

