import express from 'express'
import * as dotenv from 'dotenv'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { pool } from './db.js'
dotenv.config()

const app = express()

app.use(express.json())

export const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']

	const token = authHeader && authHeader.split(' ')[1]

	if (!token) return res.status(401).json({ Unauthorized: true })

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ Forbidden: true })
		req.user = user
		next()
	})
}
let tokens = []
app.post('/get-new-token', (req, res) => {
	const refreshToken = req.body.token
	if (refreshToken == null)
		return res.status(401).json({ error: 'Unauthorized' })
	if (!refreshToken.includes(tokens))
		return res.status(403).json({ error: 'Forbidden' })
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: 'Forbidden' })
		const accessToken = generateAccessToken({ name: user.name })
		res.status(200).json({ accessToken })
	})
	console.log('the token', refreshToken)
})

app.delete('/logout', (req, res) => {
	tokens = tokens.filter((t) => t !== req.body.token)
	res.status(204).json({ message: 'Logout successful' })
})

app.post('/login', (req, res) => {
	const username = req.body.username
	const user = { name: username }

	const accessToken = generateAccessToken(user)
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
	tokens.push(refreshToken)

	res.status(200).json({ accessToken, refreshToken })
})

const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
}

const port = process.env.PORT_AUTH || 3002
app.listen(port, () => {
	console.log(`Auth Server is running on port ${port}`)
})
