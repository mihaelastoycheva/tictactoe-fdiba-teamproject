const express = require('express');
const path = require('path');
var cors = require('cors');
const { error } = require('console');
var bodyParser = require('body-parser')
// Create an instance of the express application
const app = express();
// Specify a port number for the server
const port = 5001;
// Start the server and listen to the port

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));


app.use(cors()) // Use this after the variable declaration

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: '123456',
	port: 5432,
})


app.use('/game', express.static(path.join(__dirname, 'public')))

app.get('/ranking', (req, res) => {

	pool.query('SELECT username, wins FROM players ORDER BY wins DESC limit 10;', (error, results) => {
		if (error) {
			throw error
		}

		const responseObject = {
			rankingArray: results.rows
		};
		res.status(200).json(responseObject)
	})
});


app.post('/register', async (req, res) => {

	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	var errorArray = [];

	const usernameResults = await pool.query('select * from players where username = $1', [username]);
	const emailResults = await pool.query('select * from players where email = $1', [email]);

	if (usernameResults.rowCount > 0) {
		errorArray.push('E1: username exist');
	}
	if (emailResults.rowCount > 0) {
		errorArray.push('E2: email exist');
	}

	if (errorArray.length > 0) { //has error
		const responseObject = {
			success: false,
			errorCodes: errorArray
		}

		res.status(200).json(responseObject);
	} else { //everything is fine
		await pool.query('INSERT INTO players (username, email, password, wins) VALUES ($1, $2, $3, 0)', [username, email, password]);
		const responseObject = {
			success: true,
			errorCodes: errorArray
		};
		res.status(200).json(responseObject);
	}
});

app.post('/signin', async (req, res) => {
	var usernameFirst = req.body.usernameFirst;
	var passwordFirst = req.body.passwordFirst;
	var usernameSec = req.body.usernameSec;
	var passwordSec = req.body.passwordSec;

	var errorArray = [];

	function addToArray(element) {
		this.errorArray.push(element);
	}

	const usernameFirstResults = await pool.query('SELECT * FROM players WHERE username = $1', [usernameFirst]);
	const usernameSecResults = await pool.query('SELECT * FROM players WHERE username = $1', [usernameSec]);


	if (usernameFirstResults.rowCount === 0 || usernameSecResults.rowCount === 0) { //ne otkriva dvata username
		errorArray.push('E1: username(s) does not exist');
		const responseObject = {
			success: false,
			errorCodes: errorArray
		}

		return res.status(200).json(responseObject);
	}

	const passwordFirstResults = await pool.query('SELECT password FROM players WHERE username = $1', [usernameFirst]);
	const passwordSecResults = await pool.query('SELECT password FROM players WHERE username = $1', [usernameSec]);

	const passwordFirstFromDB = passwordFirstResults.rows[0].password;
    const passwordSecFromDB = passwordSecResults.rows[0].password;

	if (passwordFirst !== passwordFirstFromDB || passwordSec !== passwordSecFromDB) {
		errorArray.push('E2: password(s) does not match');
		const responseObject = {
			success: false,
			errorCodes: errorArray
		}

		return res.status(200).json(responseObject);
	}

	const responseObject = {
		success: true,
		errorCodes: errorArray
	};
	return res.status(200).json(responseObject);
});

app.post('/game', async (req, res) => {
	var username1 = req.body.usernameFirst;
	var username2 = req.body.usernameFirst;
	var winnerCode = req.body.winnerCode;

	if(winnerCode === 1){
		await pool.query('UPDATE players SET wins = wins + 1 WHERE username = $1', [username1], (error, results) => {
			if (error) {
				throw error
			}
	
			const responseObject = {
				success: true,
			};
			res.status(200).json(responseObject)
		})
	} else if (winnerCode === 2){
		await pool.query('UPDATE players SET wins = wins + 1 WHERE username = $1', [username2], (error, results) => {
			if (error) {
				throw error
			}
	
			const responseObject = {
				success: true,
			};
			res.status(200).json(responseObject)
		})
	}

	
});