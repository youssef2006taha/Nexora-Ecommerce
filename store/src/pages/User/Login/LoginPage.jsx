import { Mail, Lock, CheckCircle } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-400 p-12 text-white flex flex-col justify-center">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            📦 Koda Commerce
          </h3>

          <h1 className="text-5xl font-bold mt-8 leading-tight">
            Manage Your Store <br /> Like a Pro
          </h1>

          <p className="mt-6 text-blue-100">
            Control products, orders, users, carts and analytics from a modern
            dashboard experience.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/20 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle />
              Product Management
            </div>

            <div className="bg-white/20 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle />
              Order Tracking
            </div>

            <div className="bg-white/20 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle />
              User Analytics
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-[#111827] p-12 text-white flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <img
              src="/KodaLogo2-D3eRgjLV.png"
              alt="logo"
              className="w-36"
            />
          </div>

          <h2 className="text-4xl font-bold">Welcome Back</h2>

          <p className="text-gray-400 mt-2">Sign in to your admin dashboard</p>

          <form className="mt-10 space-y-6 text-left">
            <div>
              <label className="text-sm text-gray-300 ">Email Address</label>

              <div className="flex items-center bg-gray-800 rounded-lg px-4 mt-2">
                <Mail className="text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent w-full p-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Password</label>

              <div className="flex items-center bg-gray-800 rounded-lg px-4 mt-2">
                <Lock className="text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="bg-transparent w-full p-3 outline-none"
                />
              </div>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-lg py-3 font-semibold">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
