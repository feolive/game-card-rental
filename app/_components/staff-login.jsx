import LoginForm from "@/app/_components/login-form";

export default function StaffLogin() {

  return (
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="text-center lg:text-left text-primary">
          <h1 className="text-3xl font-bold">Staff Login</h1>
          <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
        </div>
        <LoginForm />
      </div>
  );
}