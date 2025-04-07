import PlusIcon from "@/app/_icons/PlusIcon";
import MinusIcon from "@/app/_icons/MinusIcon";

export default function CardItem({ item }) {
  return (
    <div className="card bg-base-100 w-56 h-64 shadow-md shadow-slate-500 hover:translate-y-[-5px] transition-transform duration-300">
      <figure>
        <img
          className="w-full h-32 object-cover"
          src={item?.img || "/covers/default-card.png"}
          alt={item?.name || "game card cover"}
        />
      </figure>
      <div className="card-body gap-1">
        <div className="flex justify-between items-start -mt-3">
          <p className="card-title w-1/2 text-xs font-bold line-clamp-1" title={item?.name || "no name"}>
            {item?.name || "no name"}
          </p>
          <div className="flex flex-col justify-start items-end gap-1">
            <p className="text-base-content stat-value text-xs">
              ${item?.price || "0"}
            </p>
            <div className="badge badge-outline badge-primary badge-xs">
              Stock:<span className="text-xs">{item?.inventory || "0"}</span>
            </div>
          </div>
        </div>

        <p
          className="text-base-content text-xs line-clamp-2"
          title={item?.description || "--"}
        >
          {item?.description ||
            "The form-handler is typically a server page with a script for processing input data."}
        </p>
        <div className="card-actions justify-start items-center gap-1 mt-1 -mb-3">
          <button className="btn btn-info btn-xs rounded-full">
            <MinusIcon color="#000" />
          </button>
          <input
            type="number"
            min={0}
            max={item?.inventory || 0}
            readOnly
            className="input input-xs w-10 text-center"
            value="1"
          />
          <button className="btn btn-secondary btn-xs rounded-full">
            <PlusIcon color="#000" />
          </button>
        </div>
      </div>
    </div>
  );
}
