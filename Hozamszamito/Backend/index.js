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
//innen kezd
app.get('/api/gazda', (req, res) => {
 db.query('SELECT * FROM gazda_fiok', (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});
//idáig
app.get('/api/gazdkiad', (req, res) => {
 db.query('SELECT g.nev,f.muvelesi_ag,k.tipus FROM gazda_fiok AS g JOIN fold AS f ON g.id = f.gazda_id JOIN kiadas AS k ON f.id = k.fold_id', (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});
app.get('/api/novenyadat', (req, res) => {
 db.query('SELECT n.nnev, i.inev, ni.termes_per_kilo FROM noveny AS n JOIN noveny_input AS ni ON n.id = ni.noveny_id JOIN input_anyag AS i ON i.id = ni.inputanyag_id', (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});

//Koszta1
app.get('/api/elozoev', (req, res) => {
 db.query(`SELECT f.elozo_evi_hasznositas FROM fold AS f JOIN gazda_fiok AS g ON f.gazda_id = g.id WHERE g.nev = 'Kovács Péter'`, (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});

//Koszta2
app.get('/api/gazdanev', (req, res) => {
 db.query(`SELECT g.nev FROM gazda_fiok AS g JOIN fold AS f ON f.gazda_id = g.id WHERE f.helyrajzi_szam = '9101/5'`, (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});

//Koszta3
app.get('/api/veti', (req, res) => {
 db.query('SELECT t.vetes_idopont FROM terv AS t JOIN fold AS f ON t.fold_id = f.id WHERE t.fold_id = 1', (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});

//Koszta4
app.get('/api/datumbuza', (req, res) => {
 db.query(`SELECT k.datum FROM kiadas AS k JOIN noveny AS n ON k.noveny_id = n.id WHERE n.nnev LIKE 'Búza'`, (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});

//Koszta5
app.get('/api/termikili', (req, res) => {
 db.query(`SELECT n.nnev, ni.termes_per_kilo FROM noveny_input AS ni JOIN noveny AS n ON ni.noveny_id = n.id WHERE n.nnev LIKE 'Búza'`, (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});
// ------------------ POST New Game ------------------
app.post('/api/games', (req, res) => {
    const { title, genre, publisher, release_year, rating } = req.body;
    db.query(
    'INSERT INTO games (title, genre, publisher, release_year, rating) VALUES (?, ?, ?, ?, ?)',
    [title, genre, publisher, release_year, rating],
    (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, title, genre, publisher, release_year, rating });
    }
    );
   });
// ------------------ PUT Update Game ------------------
app.put('/api/games/:id', (req, res) => {
    const id = req.params.id;
    const { title, genre, publisher, release_year, rating } = req.body;
    db.query(
    'UPDATE games SET title=?, genre=?, publisher=?, release_year=?, rating=? WHERE id=?',
    [title, genre, publisher, release_year, rating, id],
    (err) => {
    if (err) throw err;
    res.json({ message: 'Game updated' });
    }
    );
   });
   // ------------------ DELETE Game ------------------
   app.delete('/api/games/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM games WHERE id=?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Game deleted' });
    });
   });
   


const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});
