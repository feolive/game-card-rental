import CardItem from "./card-item";

export default function CardMenu() {
  return (
    <div className="w-full h-full relative flex flex-col gap-3">
      <div className="flex justify-start items-center gap-4">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" placeholder="Search" />
          <kbd className="kbd kbd-md">↩︎</kbd>
        </label>
        <div className="w-2/3 flex justify-start items-center gap-2 overflow-x-auto overflow-y-hidden">
          <label className="btn btn-soft btn-info p-2 rounded-lg">
            <input type="checkbox" className="checkbox checkbox-info checkbox-xs" />
            <span className="text-xs ml-1">RPG</span>
          </label>
          <label className="btn btn-soft btn-info p-2 rounded-lg">
            <input type="checkbox" className="checkbox checkbox-info checkbox-xs" />
            <span className="text-xs ml-1">Action</span>
          </label>
          <label className="btn btn-soft btn-info p-2 rounded-lg">
            <input type="checkbox" className="checkbox checkbox-info checkbox-xs" />
            <span className="text-xs ml-1">Strategy</span>
          </label>
        </div>
      </div>
      <section className="grid grid-cols-4 grid-rows-2 gap-10 h-5/6 self-center">
      <CardItem item={{}} />
        <CardItem item={{}} />
        <CardItem item={{}} />
        <CardItem item={{}} />
        <CardItem item={{}} />
        <CardItem item={{}} />
        <CardItem item={{}} />
        <CardItem item={{}} />
      </section>
      <div className="flex justify-center items-center mt-1">
        <div className="join grid grid-cols-2">
          <button className="join-item btn btn-outline w-18 rounded-l-full">«</button>
          <button className="join-item btn btn-outline w-18 rounded-r-full">»</button>
        </div>
      </div>
    </div>
  );
}
