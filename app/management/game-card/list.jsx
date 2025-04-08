"use client"

import { useState, useEffect } from "react";
const { create } = require("domain");
const { InvalidatedProjectKind } = require("typescript");

const leftpad = (str, len, ch) => str.length>=len?str:(ch.repeat(len-str.length) + str);

function formatDate(date) {
  if (typeof(date) === 'number' || typeof(date) === 'string')
    date = new Date(date);
  const pad2 = any => leftpad(any.toString(), 2, '0');
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const result = fullYear + '-' +
         pad2(month) + '-' +
         pad2(day) + ' ' +
         pad2(hour) + ':' +
         pad2(minute) + ':' +
         pad2(second);
  return result;
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Inventory</th>
        <th>Last Update</th>
        <th>Create Date</th>
        <th>Price</th>
        <th>Operation</th>
      </tr>
    </thead>
  );
}

function TableItem(item, onEdit, onDelete) {
  return (
    <tr key={item.name}>
      {/* input */}
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      {/* Name and Description */}
      <td>
        <div className="flex items-center gap-3">
          {/*
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={item.img}
                alt="" />
            </div>
          </div>
          */}
          <div>
            <div className="font-bold">{item.name}</div>
            <div className="text-sm opacity-50">{item.description}</div>
          </div>
        </div>
      </td>
      { /* Inventory */ }
      <td>
        {item.inventory}
      </td>

      { /* Last Update */ }
      <td>
        {formatDate(item.updatedTime)}
      </td>

      { /* created time */ }
      <td>
        {formatDate(item.createdTime)}
      </td>

      { /* Price */ }
      <td>
        {item.price}
      </td>

      {/* Operations */}
      <th>
        <button className="btn btn-ghost btn-xs" onClick={()=>onEdit(item)}>Edit</button> <br/>
        <button className="btn btn-ghost btn-xs" onClick={()=>onDelete(item)}>Delete</button>
      </th>
      { /*
      <td>
        Zemlak, Daniel and Leannon
        <br />
        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
      </td>
      <td>Purple</td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
      */ }
    </tr>
  );
}

export default function GameCardList({loaded, gameCards, onEdit, onDelete}) {
    return (!loaded ?
        <div className="overflow-x-auto flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      :
      <>
        <div className="overflow-x-auto">
          <table className="table">
            <TableHeader />
            <tbody>
                {gameCards.map(item => TableItem(item, onEdit, onDelete))}
            </tbody>
            {/* 
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
            */}
          </table>
        </div>
      </>
    );
}
