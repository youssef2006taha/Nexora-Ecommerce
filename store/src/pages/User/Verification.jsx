import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import api from "../../../api/axios"
import { useNavigate } from "react-router-dom"

export default function Verification() {

    const [OTP, setOTP] = useState("")
    const [showToast, setShowToast] = useState(0)

    function validateOTP() {
        for (var i = 0; i < OTP.length; i++)
            if (OTP.charCodeAt(i) < 48 || OTP.charCodeAt(i) > 57)
                return 1
        if (OTP.length != 6) return 2
        return 0

    }

    const location = useLocation()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        const report = validateOTP();

        if (report !== 0) {
            setShowToast(report);

            console.log(showToast);
            return;
        }

        const email = location.state?.userEmail

        api.post("/auth/register/verify-otp", { email, OTP })
            .then((response) => {
                // console.log("OTP Sended Successfully", response)
                navigate("/login")
            })
            .catch((error) => {
                // console.error("Error in Sending OTP ", error)
            });

    }
    useEffect(() => {
        if (showToast !== 0) {
            const timer = setTimeout(() => {
                setShowToast(0);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <section className="w-full h-screen flex items-center justify-center">
            {showToast === 1 && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-sm p-4 text-red-800 bg-red-100 rounded-lg shadow-xl border-2 border-red-300" role="alert">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                        </svg>
                        <span className="font-bold text-lg">Error: Digits Only!</span>
                    </div>
                </div>
            )}

            {showToast === 2 && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-sm p-4 text-red-800 bg-red-100 rounded-lg shadow-xl border-2 border-red-300" role="alert">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                        </svg>
                        <span className="font-bold text-lg">Error: Length must be 6 digits!</span>
                    </div>
                </div>
            )}
            <div className="text-center space-y-6">
                <h1 className="text-accent/70 capitalize text-3xl font-bold tracking-wider">verify your account <hr className="w-3/4 m-auto mt-2" /></h1>
                <form onSubmit={handleSubmit} className="w-fit gap-4 bg-bg-card p-6 flex justify-around rounded-2xl border border-border-light flex-wrap shadow-shadow-primary font-semibold">
                    <input
                        type="text"
                        placeholder="1 2 3 4 5 6"
                        maxLength="6"
                        className="outline-none bg-white p-2 border border-border rounded-sm focus:border-accent focus:ring-2 focus:ring-accent"
                        value={OTP}
                        onChange={(e) => { setOTP(e.target.value) }}
                    />
                    <button
                        type="submit"
                        className="border border-border bg-secondary tracking-widest px-6 py-2 rounded-sm cursor-pointer hover:bg-secondary/80"
                    >
                        Verify
                    </button>
                </form>
            </div>
        </section>
    )
}
