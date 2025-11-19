const exp = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = exp();
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'mezogazda'
});
db.connect(err => {
 if (err) throw err;
 console.log('MySQL kapcsolódva.');
});
app.get('/api/gazda', (req, res) => {
 db.query('SELECT * FROM gazda_fiok', (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});
app.get('/api/gazdkiad', (req, res) => {
 db.query('SELECT g.nev,f.muvelesi_ag,k.tipus FROM gazda_fiok AS g JOIN fold AS f ON g.id = f.gazda_id JOIN kiadas AS k ON f.id = k.fold_id ', (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});
const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});
