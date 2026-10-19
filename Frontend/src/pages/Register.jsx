import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { errors, handleSubmit, navigate, onRegister, register } = useAuth();

  return (
    <div className="h-screen w-full flex">
      <div className="w-[60%]">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1790058210893-0378d6adf0c2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
          alt="Login background"
        />
      </div>

      <div className="w-[40%] bg-white flex justify-center items-center">
        <div className="flex flex-col gap-8 h-fit w-100 bg-white rounded-2xl shadow-2xl p-8 py-10">
          <div>
            <h3 className="text-center text-4xl font-bold tracking-tight">
              Register
            </h3>
          </div>

          <form
            onSubmit={handleSubmit(onRegister)}
            className="flex gap-4 flex-col w-full"
          >
            <div>
              <input
                className="w-full p-2 border border-slate-300 rounded-lg font-semibold placeholder:text-slate-400 placeholder:text-[.8rem]"
                type="text"
                placeholder="Enter your fullname"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: 3,
                    message: "Username must be atleast 3 characters!",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <input
                className="w-full p-2 border border-slate-300 rounded-lg font-semibold placeholder:text-slate-400 placeholder:text-[.8rem]"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                className="w-full p-2 border border-slate-300 rounded-lg font-semibold placeholder:text-slate-400 placeholder:text-[.8rem]"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#0c0c0c] rounded-[20px] p-2 py-3 text-white font-semibold cursor-pointer"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <strong className="cursor-pointer" onClick={() => navigate("/")}>
              Login
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
