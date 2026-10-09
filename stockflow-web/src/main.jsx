import React, {useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Boxes, LayoutDashboard, Package, Plus, Pencil, Trash2, X, Search, CircleDot} from 'lucide-react';
import './style.css';

const API='http://localhost:5094/api/Productos';
const empty={id:0,nombre:'',descripcion:'',precio:'',stock:''};

function App(){
 const [items,setItems]=useState([]),[form,setForm]=useState(empty),[open,setOpen]=useState(false),[query,setQuery]=useState(''),[error,setError]=useState('');
 const load=async()=>{try{setItems(await (await fetch(API)).json());setError('')}catch{setError('No se pudo conectar con la API. Ejecuta StockFlow.Api.')}};
 useEffect(()=>{load()},[]);
 const filtered=items.filter(x=>x.nombre.toLowerCase().includes(query.toLowerCase()));
 const totalStock=useMemo(()=>items.reduce((a,x)=>a+x.stock,0),[items]);
 const value=useMemo(()=>items.reduce((a,x)=>a+x.precio*x.stock,0),[items]);
 const save=async e=>{e.preventDefault(); const body={...form,precio:Number(form.precio),stock:Number(form.stock)}; const edit=body.id>0; await fetch(edit?`${API}/${body.id}`:API,{method:edit?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});setOpen(false);setForm(empty);load();};
 const remove=async id=>{if(confirm('¿Eliminar este producto?')){await fetch(`${API}/${id}`,{method:'DELETE'});load();}};
 return <div className="shell">
   <aside><div className="brand"><Boxes size={25}/><span>STOCKFLOW</span></div><nav><a className="active"><LayoutDashboard/> Overview</a><a><Package/> Products</a></nav><div className="sidefoot"><span>LOS SANTOS</span><small>Inventory System · v1.0</small></div></aside>
   <main><header><div><span className="eyebrow">INVENTORY / OVERVIEW</span><h1>Inventory management</h1><p>Control de productos, existencias y valor de inventario.</p></div><div className="status"><CircleDot size={15}/> API CONNECTED</div></header>
   {error&&<div className="error">{error}</div>}
   <section className="stats"><article><span>PRODUCTS</span><strong>{items.length}</strong><small>Registros activos</small></article><article><span>IN STOCK</span><strong>{totalStock}</strong><small>Unidades disponibles</small></article><article><span>INVENTORY VALUE</span><strong>Q {value.toLocaleString('es-GT',{maximumFractionDigits:2})}</strong><small>Valor estimado</small></article></section>
   <section className="panel"><div className="panelhead"><div><span className="eyebrow">CATALOG</span><h2>Products</h2></div><button onClick={()=>{setForm(empty);setOpen(true)}}><Plus size={17}/> Add product</button></div>
   <div className="search"><Search size={17}/><input placeholder="Search products" value={query} onChange={e=>setQuery(e.target.value)}/></div>
   <div className="tablewrap"><table><thead><tr><th>PRODUCT</th><th>DESCRIPTION</th><th>PRICE</th><th>STOCK</th><th>ACTIONS</th></tr></thead><tbody>{filtered.map(x=><tr key={x.id}><td><b>{x.nombre}</b><small>#{String(x.id).padStart(3,'0')}</small></td><td>{x.descripcion}</td><td>Q {Number(x.precio).toFixed(2)}</td><td><span className="pill">{x.stock} units</span></td><td><div className="actions"><button className="icon" onClick={()=>{setForm(x);setOpen(true)}}><Pencil size={16}/></button><button className="icon danger" onClick={()=>remove(x.id)}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div></section>
   </main>
   {open&&<div className="modalback"><form className="modal" onSubmit={save}><div className="modalhead"><div><span className="eyebrow">PRODUCT RECORD</span><h2>{form.id?'Edit product':'Add product'}</h2></div><button type="button" className="close" onClick={()=>setOpen(false)}><X/></button></div><label>Name<input required value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/></label><label>Description<textarea value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})}/></label><div className="grid"><label>Price (Q)<input required min="0" step="0.01" type="number" value={form.precio} onChange={e=>setForm({...form,precio:e.target.value})}/></label><label>Stock<input required min="0" type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})}/></label></div><div className="modalactions"><button type="button" className="secondary" onClick={()=>setOpen(false)}>Cancel</button><button>Save product</button></div></form></div>}
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
