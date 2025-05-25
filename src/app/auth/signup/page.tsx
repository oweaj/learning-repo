import AuthForm from "../_components/AuthForm";

const Signup = () => {
  return (
    <div className="w-full h-screen px-4 py-14">
      <div className="max-w-[500px] h-full mx-auto flex flex-col items-center gap-10">
        <h1 className="text-3xl font-black text-orange-400">BLOG</h1>
        <AuthForm submit="signup" />
      </div>
    </div>
  );
};

export default Signup;
