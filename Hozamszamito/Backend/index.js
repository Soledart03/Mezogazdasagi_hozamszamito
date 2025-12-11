const exp = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
app.get(apiurl+'/:id', async (req,res)=>{
    console.log(req.params.id);
    db.query('SELECT id, nev, email FROM gazda_fiok WHERE id=?',[req.params.id],(err,result)=>{
        if(err) throw err;
        if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
})
app.post('/api/log', async (req,res)=>{
    const {id, nev, email, jelszo} = req.body;
    
    db.query('SELECT id,nev,jelszo FROM gazda_fiok WHERE nev = ? AND email = ?',[nev,email],(err,results)=>{
        
        if(err) throw err;
        
        bcrypt.compare(jelszo,results[0].jelszo,(err,result)=>{
            if(err) throw err;
            if(!result){
                
                return res.status(401).json({error:'Helytelen jelszó'});
            }
            
            res.json({success:true,id:results[0].id});
        });
    
        
    })
    
});
app.post(apiurl, async (req, res) => {
    const { nev, email, jelszo} = req.body;
    const haspas = await bcrypt.hash(jelszo,10);
    db.query(
    'INSERT INTO gazda_fiok (nev, email, jelszo) VALUES (?, ?, ?)',
    [nev, email, haspas],
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
