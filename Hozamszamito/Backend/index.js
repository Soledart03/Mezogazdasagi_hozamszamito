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
const apiurl = '/api/gazda';

app.get(apiurl, (req, res) => {
 db.query('SELECT * FROM gazda_fiok', (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});

app.post(apiurl, (req, res) => {
    const { nev, email, jelszo} = req.body;
    db.query(
    'INSERT INTO gazda_fiok (nev, email, jelszo) VALUES (?, ?, ?)',
    [nev, email, jelszo],
    (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nev, email, jelszo });
    }
    );
   });
   
const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});
