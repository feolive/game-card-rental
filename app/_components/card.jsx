"use client";


export default function Card({children}) {
  return (
    <div className="card w-full h-3/4 bg-base-100 absolute bottom-24 shadow-sm">
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}