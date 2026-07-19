import React from "react";
import { BsLightningCharge } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api/axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (!username || !email || !phone || !password || password.length < 6) {
      return
    }

    api.post("/auth/register/send-otp", { username, email, password, phone })
      .then((response) => {
        // console.log("OTP Sended Successfully", response)
        navigate("/verification", { state: { userEmail: email } })
      })
      .catch((error) => {
        // console.error("Error in Sending OTP ", error)
      })
  }

  return (
    <section className="w-full h-screen bg-white dark:bg-bg-surface flex justify-center items py-12">
      <div className="w-full max-w-md px-4 lg:px-0 space-y-6">

        <div className="text-center space-y-1.5">
          <Link to="/home" className="inline-flex gap-x-2 items-center text-[#4f46e5] font-bold text-2xl">
            <BsLightningCharge />
            <span>Koda Store</span>
          </Link>
          <p className="text-text-primary font-bold text-lg">Create an Account</p>
          <p className="text-text-muted text-sm">Join us and start shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-bg-active dark:bg-[#1e293b] rounded-md border border-bg-surface dark:border-slate-700 p-6 space-y-3">

          {/* Username */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Username</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <input placeholder="johndoe" className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-sm bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 ${isSubmitted && !username ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-[#6366f1] border-border dark:border-slate-600'} `} type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            {isSubmitted && !username && <p className="text-red-500 text-xs mt-1">Username is required</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Email</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
              <input placeholder="you@example.com" className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-sm bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 ${isSubmitted && !email ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-[#6366f1] border-border dark:border-slate-600'} `} type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            {isSubmitted && !email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Phone</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              <input placeholder="01234567890" className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-sm bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 ${isSubmitted && !phone ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-[#6366f1] border-border dark:border-slate-600'} `} type="tel" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
            </div>
            {isSubmitted && !phone && <p className="text-red-500 text-xs mt-1">Phone</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Password</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <input placeholder="••••••••" className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-sm bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 ${isSubmitted && !password ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-[#6366f1] border-border dark:border-slate-600'} `} type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            {isSubmitted && !password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
            {isSubmitted && password && password.length < 6 && <p className="text-red-500 text-xs mt-1">Password should be at least 6 characters</p>}
          </div>

          {/* Button */}
          <button className="flex items-center justify-center font-medium rounded-sm duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-[#4f46e5] text-white hover:bg-[#4338ca] active:bg-brand-[#312e81] px-6 py-3 w-full" type="submit">Create Account</button>
          <p className="text-center"><span className="text-text-muted">Already have an account?</span> <Link to="/login" className="text-[#4f46e5]">Sign In</Link></p>
        </form>
      </div>
    </section>
  )
};

export default React.memo(RegisterPage);