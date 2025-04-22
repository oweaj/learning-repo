import LoginForm from "./_components/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-screen px-4 py-14">
      <div className="max-w-[500px] h-full mx-auto flex flex-col items-center gap-10">
        <h1 className="text-3xl font-black text-orange-400">BLOG</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
