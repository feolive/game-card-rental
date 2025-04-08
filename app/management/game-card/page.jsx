"use client";

import { createRef, useState } from "react";
import { useEffect } from "react";
import tryCatch from "@/app/_utils/try-catch";
import GameCardList from "./list";

export default function GameCard() {

  // TODO: REPLACE ALL THE CODE BELOW WITH YOUR OWN CODE
  // THE COMMENTED CODE IS A SIMPLE REQUEST TO THE API THAT LOCATES IN THE app/api/management/game-card/route.ts

  // const [category, setCategory] = useState({});
  const refInput = createRef();
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key == 'k') {
        e.preventDefault();
        refInput.current?.focus();
      }
    });
  }, [refInput]);

  const emptyItem = {
        id: -1,
        name: '',
        description: '',
        inventory: null,
        price: null,
      };

  const [editItem, setEditItem] = useState(emptyItem);
  const [refreshKey, setRefreshKey] = useState(0);
  const [gameCards, setGameCards] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toDelete, setToDelete] = useState(emptyItem);
  const [listFilter, setListFilter] = useState(() => x=>x);
  const refreshList = ()=> {
      setLoaded(false);
      setRefreshKey(refreshKey+1);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/management/game-card');
      const data = await res.json();
      setGameCards(data);
      setLoaded(true);
    }
    fetchData();
  }, [refreshKey]);

  const openDialog = item => {
    if (item === null || item === undefined) {
      item = emptyItem;
    }
    setEditItem(item);
    document.getElementById('editDialog').showModal();
  }

  const closeDialog = () => {
    document.getElementById('editDialog').close();
    setEditItem(emptyItem);
  }

  const saveDialog = () => {
    let method;
    if (editItem.id === -1) {
      method = 'POST';
    } else {
      method = 'PUT';
    }
    fetch('/api/management/game-card', {
                method: method,
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(editItem)}).then(()=>{
      closeDialog();
      refreshList();
    });
  }

  const deleteItem = id => {
    fetch('/api/management/game-card', {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
        body: JSON.stringify({id: id})}).then(refreshList);
  }

  const confirmDelete = item => {
    setToDelete(item);
    document.getElementById('deleteOrNot').showModal()
  }

  const updateFilter = s => setListFilter(() => item => item.name.toLowerCase().includes(s.toLowerCase()) || item.description.toLowerCase().includes(s.toLowerCase()));

  return (
    <div>
      <h1>
        Game Card Management
      </h1>
      <label className="input w-180 ml-10 mr-10 mt-4 mb-4">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
        <input ref={refInput} type="search" className="grow" placeholder="Search" onChange={e=>updateFilter(e.target.value)} />
        <kbd className="kbd kbd-sm">{/macintosh|mac os x/i.test(navigator.userAgent)?'⌘':'⌃'}</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
      <button className="btn" onClick={()=>openDialog(null)}>Add New</button>
      <GameCardList loaded={loaded} gameCards={gameCards.filter(listFilter)} onEdit={openDialog} onDelete={confirmDelete}/>
      {/* edit */}
      <dialog id="editDialog" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{(editItem&&editItem.id!==-1)?'Edit: '+editItem.name:'Add New'}</h3>
          <p className="py-4">Click the button below to close</p>
              <label className="fieldset-label">Title</label>
              <input type="text" className="input w-full" placeholder="Name of the Game" value={editItem?.name} onChange={e=>setEditItem({...editItem, name:e.target.value})} />
              <p>&nbsp;</p>
              <label className="fieldset-label">Inventory</label>
              <input id="inventory" type="number" className="input validator w-full" required placeholder="Type the inventory" min="0" max="1000" title="0 to 1000" value={editItem?.inventory ?? ''} onChange={e=>setEditItem({...editItem, inventory:parseInt(e.target.value)})} />
              <p className="validator-hint">Must be between be 0 to 1000</p>
              <label className="fieldset-label">Price</label>
              <input type="number" className="input validator w-full" required placeholder="Type the price" min="0.01" max="100" step="0.01" title="0.01 to 100" value={editItem?.price ?? ''} onInput={e=>setEditItem({...editItem, price:parseFloat(e.target.value)})} />
              <p className="validator-hint">Must be between be 0.01 to 100</p>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Description</legend>
                <textarea id="description" className="textarea h-24 w-full" placeholder="Description" value={editItem?.description} onInput={e=>setEditItem({...editItem, description:e.target.value})} ></textarea>
                <div className="fieldset-label">Optional</div>
              </fieldset>
          <div className="modal-action">
            <form method="dialog" className="w-full flex justify-between">
              <button className="btn" onClick={saveDialog}>Save</button>
              <button className="btn" onClick={closeDialog}>Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="deleteOrNot" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm?</h3>
          <p className="py-4">Do you really want to delete <b>{toDelete.name}</b></p>
          <div className="modal-action">
            <form method="dialog" className="w-30 flex justify-between">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={()=>deleteItem(toDelete.id)}>Yes</button>
              <button className="btn" onClick={()=>setToDelete(emptyItem)}>No</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
