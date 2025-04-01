"use client";
import AuthContextProvider from "@/app/_utils/auth-context";
import StaffLogin from "../_components/staff-login";
import Sidebar from "../_components/side-bar";

export default function ManagementLayout({ children }) {
  return (
    <AuthContextProvider loginPage={<StaffLogin />}>
      <div className="text-base-content bg-base-100">
        <Sidebar />
        <main className="ml-64 p-8">{children}</main>
      </div>
    </AuthContextProvider>
  );
}
