const express = require('express');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
const db = new DatabaseSync(path.join(__dirname, 'teamstyle.db'));
db.exec('PRAGMA journal_mode = WAL;');
db.exec(`CREATE TABLE IF NOT EXISTS orders (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 client TEXT NOT NULL, team TEXT NOT NULL, sport TEXT NOT NULL,
 design TEXT NOT NULL, email TEXT NOT NULL, phone TEXT,
 baseColor TEXT NOT NULL, detailColor TEXT NOT NULL, notes TEXT,
 players TEXT NOT NULL, image TEXT, status TEXT NOT NULL DEFAULT 'Recibido',
 createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);
app.use(express.json({limit:'1mb'}));
app.use(express.static(__dirname));
app.get('/api/orders', (req,res) => {
 const rows = db.prepare('SELECT * FROM orders ORDER BY id DESC').all();
 res.json(rows.map(r => ({...r, players: JSON.parse(r.players)})));
});
app.post('/api/orders', (req,res) => {
 const o=req.body||{};
 if(!o.client||!o.team||!o.sport||!o.design||!o.email||!Array.isArray(o.players)||!o.players.length){
   return res.status(400).json({error:'Faltan datos obligatorios o jugadores.'});
 }
 const insert=db.prepare(`INSERT INTO orders (client,team,sport,design,email,phone,baseColor,detailColor,notes,players,image)
 VALUES (@client,@team,@sport,@design,@email,@phone,@baseColor,@detailColor,@notes,@players,@image)`);
 const result=insert.run({...o, phone:o.phone||'', notes:o.notes||'', image:o.image||'', players:JSON.stringify(o.players)});
 res.status(201).json({id:Number(result.lastInsertRowid), message:'Solicitud guardada en la base de datos.'});
});
app.patch('/api/orders/:id', (req,res) => {
 const allowed=['Recibido','En revisión','En producción','Entregado','Cancelado'];
 const status=req.body?.status;
 if(!allowed.includes(status)) return res.status(400).json({error:'Estado no válido.'});
 const result=db.prepare('UPDATE orders SET status=? WHERE id=?').run(status, req.params.id);
 if(!result.changes) return res.status(404).json({error:'Pedido no encontrado.'});
 res.json({message:'Estado actualizado.'});
});
app.delete('/api/orders/:id', (req,res) => {
 const result=db.prepare('DELETE FROM orders WHERE id=?').run(req.params.id);
 if(!result.changes) return res.status(404).json({error:'Pedido no encontrado.'});
 res.json({message:'Pedido eliminado.'});
});
app.listen(PORT,()=>console.log(`TeamStyle funcionando en http://localhost:${PORT}`));
