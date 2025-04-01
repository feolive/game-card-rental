"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import DashboardIcon from "@/app/_icons/DashboardIcon";
import HomeIcon from "@/app/_icons/HomeIcon";
import UsersIcon from "@/app/_icons/UsersIcon";
import GridIcon from "@/app/_icons/GridIcon";
import { AuthContext } from "@/app/_utils/auth-context";
import { useContext } from "react";

const MGMT_PREFIX = "/management";

const menuItems = [
  { href: `${MGMT_PREFIX}`, label: "Home", icon: HomeIcon },
  { href: `${MGMT_PREFIX}/customer`, label: "Customers", icon: UsersIcon },
  { href: `${MGMT_PREFIX}/game-card`, label: "Game Cards", icon: GridIcon},
];

export default function SideBar() {
  const { signOut } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-base-100 text-base-content fixed left-0 top-0 ">
      <div className="flex flex-row justify-center items-center w-full h-10 bg-gradient-to-r from-[#ff006e] to-[#8338ec] rounded-badge">
        <p className="text-lg font-bold italic text-white">
          Customer & Card Center
        </p>
      </div>
      <nav className="py-12 ml-4">
        <ul className="space-y-6">
          {menuItems.map((item) => {
            let Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx("w-full sm:h-14 flex justify-start sm:gap-4 items-center btn btn-ghost text-xl text-base-content rounded-md", {
                    "btn-active text-primary": pathname === item.href,
                  })}
                >
                  <Icon color="#ff006e" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute left-[30%] bottom-12 inset-x-auto flex justify-center content-end gap-10">
        <button
          className="btn btn-outline rounded-badge"
          onClick={async () => {
            await signOut();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
