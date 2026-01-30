const exp = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');


const app = exp();
dotenv.config({path:'./sc.env'});

app.use(cors());
app.use(bodyParser.json());
const db = require('./db');


if (process.env.NODE_ENV !== 'test') {
  db.connect(err => {
    if (err) throw err;
    console.log('MySQL kapcsolódva.');
  });
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Nem adott meg üzenetet' });
    }
    const response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.POLLINATIONS_API_KEY}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: "Egy mezőgazdászokat segítő, mezőgazdaságban profi chatbot vagy, illegális dogokat vagy káromkodást nem használhatsz soha"
          },
          {
            role: 'user',
            content: message
          }
  ],
        model:'mistral',
        max_tokens: 300
      })
    });

    const text = await response.text();
 
    if (!response.ok) {
      return res.status(500).json({
        error: 'Pollinations API error',
        details: text
      });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: 'Invalid JSON from Pollinations',
        raw: text
      });
    }

    res.json({
     
      reply: data.choices[0].message.content
    });

  } catch (err) {

    res.status(500).json({ error: 'Internal server error' });
  }
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
app.get('/api/gfold/:id',(req,res)=>{
    db.query('SELECT * FROM fold WHERE fold.gazda_id = ?;',[req.params.id],(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
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

   
   app.get('/api/foldszam',(req,res)=>{
    db.query('SELECT COUNT(*) FROM fold;',(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
});  

   

   app.post('/api/pfold', async (req, res) => {
    const {terulet, muvelesi_ag, helyrajzi_szam,elozo_evi_hasznositas,gazda_id} = req.body;
    
    db.query(
    'INSERT INTO fold(terulet,muvelesi_ag,helyrajzi_szam,elozo_evi_hasznositas,gazda_id) VALUES(?,?,?,?,?)',
    [terulet, muvelesi_ag, helyrajzi_szam,elozo_evi_hasznositas,gazda_id],
    (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, terulet, muvelesi_ag, helyrajzi_szam,elozo_evi_hasznositas,gazda_id});
    }
    );
   });
   app.put('/api/ufold/:id', (req, res) => {
 const id = req.params.id;
 const {terulet, muvelesi_ag, helyrajzi_szam,elozo_evi_hasznositas,gazda_id} = req.body;
 db.query(
 'UPDATE fold SET terulet=?, muvelesi_ag=?, helyrajzi_szam=?,elozo_evi_hasznositas=?WHERE id=?',
 [terulet, muvelesi_ag, helyrajzi_szam,elozo_evi_hasznositas,id],
 (err) => {
 if (err) throw err;
 res.json({ message: 'Föld frissítve!' });
 }
 );
});

app.put('/api/gazdaup/:id', (req, res) => {
 const id = req.params.id;
 const {nev,email,jelszo} = req.body;
 db.query(
 'UPDATE gazda SET nev=?,email=?,jelszo=? WHERE id=?',
 [nev,email,jelszo,id],
 (err) => {
 if (err) throw err;
 res.json({ message: 'Gazda frissült!' });
 }
 );
});

   app.delete('/api/dfold/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM fold WHERE id=?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Föld törölve!'});
    });
    });

    app.delete('/api/gazdad/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM fold WHERE id=?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Gazda törölve!'});
    });
    });


    app.get('/api/noveny', async (req,res)=>{
    db.query('SELECT id,nnev,termar,kep FROM noveny',(err,result)=>{
        if(err) throw err;
        if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
    
})
app.get('/api/noveny_i', async (req,res)=>{
    db.query('SELECT noveny_id,inputanyag_id,termes_per_kilo FROM noveny_input',(err,result)=>{
        if(err) throw err;
        if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
    
})
app.get('/api/novinp', async (req,res)=>{
    db.query('SELECT n.id as id, n.nnev, ni.termes_per_kilo as tpk,i.id as iad, i.inev, i.ar, i.fajta FROM noveny as n JOIN noveny_input as ni ON n.id = ni.noveny_id JOIN input_anyag as i ON i.id = ni.inputanyag_id;',(err,result)=>{
        if(err) throw err;
        if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
    
})
app.get('/api/inp_v', async (req,res)=>{
    db.query('SELECT id,inev,ar,fajta FROM input_anyag WHERE inev = "Vetőmag"',(err,result)=>{
        if(err) throw err;
        if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
    
})
app.get('/api/inp_m', async (req,res)=>{
    db.query('SELECT id,inev,ar,fajta FROM input_anyag WHERE inev = "Műtrágya"',(err,result)=>{
        if(err) throw err;
        if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
    
})
//kiadás kezelők
app.get('/api/kiad/:id', async (req,res)=>{
    const id = req.params.id;
    db.query('SELECT id,datum,osszeg,tipus,leiras,fold_id,noveny_id,inputanyag_id FROM kiadas WHERE fold_id=?',[id],(err,result)=>{
        if(err) throw err;
        //if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
    
})
app.post('/api/kiad', async (req, res) => {
    const {datum,osszeg,tipus,leiras,fold_id,noveny_id,inputanyag_id} = req.body;
    
    db.query(
    'INSERT INTO kiadas(datum,osszeg,tipus,leiras,fold_id,noveny_id,inputanyag_id) VALUES(?,?,?,?,?,?,?)',
    [datum,osszeg,tipus,leiras,fold_id,noveny_id,inputanyag_id],
    (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, datum,osszeg,tipus,leiras,fold_id,noveny_id,inputanyag_id});
    }
    );
   });
   app.put('/api/kiad/:id', (req, res) => {
 const id = req.params.id;
 const {datum,osszeg,tipus,leiras,fold_id,noveny_id,inputanyag_id} = req.body;
 db.query(
 'UPDATE kiadas SET datum=?,osszeg=?,tipus=?,leiras=?,fold_id=?,noveny_id=?,inputanyag_id=? WHERE id=?',
 [datum,osszeg,tipus,leiras,fold_id,noveny_id,inputanyag_id,id],
 (err) => {
 if (err) throw err;
 res.json({ message: 'Kiadás frissült!' });
 }
 );
});
app.delete('/api/kiad/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM kiadas WHERE id=?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Kiadás törölve!'});
    });
    });
//tervezetkezelők
app.get('/api/terv/:id', async (req,res)=>{
    const id = req.params.id;
    db.query('SELECT id,fold_id,noveny_id,kiv_vetoid,kiv_mutrid,vetes_idopont,tomeg,osszeg FROM terv WHERE fold_id=?',[id],(err,result)=>{
        if(err) throw err;
        //if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
    
})
app.get('/api/tervs', async (req,res)=>{
    const id = req.params.id;
    db.query('SELECT id,fold_id,noveny_id,kiv_vetoid,kiv_mutrid,vetes_idopont,tomeg,osszeg FROM terv',[id],(err,result)=>{
        if(err) throw err;
        //if(result.length == 0) throw err;
        console.log(result);
        res.json(result);

    })
    
})
app.post('/api/terv', async (req, res) => {
    const {fold_id,noveny_id,kiv_vetoid,kiv_mutrid,vetes_idopont,tomeg,osszeg} = req.body;
    
    db.query(
    'INSERT INTO terv(fold_id,noveny_id,kiv_vetoid,kiv_mutrid,vetes_idopont,tomeg,osszeg) VALUES(?,?,?,?,?,?,?)',
    [fold_id,noveny_id,kiv_vetoid,kiv_mutrid,vetes_idopont,tomeg,osszeg],
    (err, results) => {
    if (err) throw err;
    console.log(results.insertId);
    res.json({ id: results.insertId, fold_id,noveny_id,kiv_vetoid,kiv_mutrid,vetes_idopont,tomeg,osszeg});
    }
    );
   });
   //????????
   app.put('/api/tervosz/:id', async (req, res) => {
     const id = req.params.id;
     const { osszeg } = req.body;
     db.query('UPDATE terv SET osszeg=? WHERE id=?', [osszeg, id], (err) => {
       if (err) throw err;
       res.json({ message: 'Tervezet frissült!' });
     });
   });
   app.put('/api/terv/:id', (req, res) => {
 const id = req.params.id;
 const {fold_id,noveny_id,vetes_idopont,tomeg,osszeg} = req.body;
 db.query(
 'UPDATE terv SET fold_id,noveny_id,kiv_vetoid,kiv_mutrid,vetes_idopont,tomeg,osszeg WHERE id=?',
 [fold_id,noveny_id,kiv_vetoid,kiv_mutrid,vetes_idopont,tomeg,osszeg,id],
 (err) => {
 if (err) throw err;
 res.json({ message: 'Tervezet frissült!' });
 }
 );
});
app.delete('/api/terv/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM terv WHERE id=?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Tervezet törölve!'});
    });
    });
//kiadasok szama

app.get('/api/kiadasok_szam/:id',(req,res)=>{
  const id = req.params.id;
  db.query('SELECT COUNT(k.id) FROM kiadas k JOIN fold as f ON k.fold_id = f.id WHERE k.fold_id = ?;',[id],(err,result)=>{
      if(err) throw err;
      if(result.length == 0) throw err;
      res.json(result);

  })
  
})

//kiadasok osszege
//?
app.get('/api/kiadasok_osszege/:id',(req,res)=>{
  const id = req.params.id;
  db.query('SELECT SUM(k.osszeg) FROM kiadas k JOIN fold as f ON k.fold_id = f.id WHERE k.fold_id = ?;',[id],(err,result)=>{
      if(err) throw err;
      if(result.length == 0) throw err;
      console.log("lefut");
      res.json(result);

  })
  
})

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports =  app ;
