import AuthContextProvider from "@/app/_utils/auth-context";
import CustomerLogin from "@/app/_components/customer-login";


export default function RentalLayout({ children }) {
  return (
    <AuthContextProvider loginPage={<CustomerLogin />}>
      <div className="text-base-content bg-base-300">
        <main className="w-full h-full">{children}</main>
      </div>
    </AuthContextProvider>
  );
}
