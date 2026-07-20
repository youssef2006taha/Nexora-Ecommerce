// import React, { createContext, useContext, useState, useEffect } from "react";
// import api from "../api/axios";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem("token") || null);
//     const [user, setUser] = useState(() => {
//         try {
//             const raw = localStorage.getItem("user");
//             return raw ? JSON.parse(raw) : null;
//         } catch {
//             return null;
//         }
//     });

//     const [loading, setLoading] = useState(true);

//     const isAuthenticated = !!token;
//     const isAdmin = user?.role === "admin";
//     const isCustomer = user?.role === "customer";

//     const login = (userData, userToken) => {
//         setUser(userData || null);
//         setToken(userToken || null);
//         if (userData) localStorage.setItem("user", JSON.stringify(userData));
//         if (userToken) localStorage.setItem("token", userToken);
//     };

//     const logout = async () => {
//         try {
//             await api.post("/auth/logout");
//         } catch (error) {
//             console.error(error);
//         }

//         setUser(null);
//         setToken(null);
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//     };

//     useEffect(() => {
//         let mounted = true;

//         const fetchMe = async () => {
//             if (!token) {
//                 if (mounted) setLoading(false);
//                 return;
//             }

//             if (user) {
//                 if (mounted) setLoading(false);
//                 return;
//             }

//             try {
//                 const { data } = await api.get("/auth/me");
//                 const me = data?.user || data?.data || data || null;
//                 if (me && mounted) {
//                     setUser(me);
//                     try {
//                         localStorage.setItem("user", JSON.stringify(me));
//                     } catch {}
//                 }
//             } catch (error) {
//                 console.error(error);
//                 if (mounted) {
//                     setUser(null);
//                     setToken(null);
//                     localStorage.removeItem("user");
//                     localStorage.removeItem("token");
//                 }
//             } finally {
//                 if (mounted) setLoading(false);
//             }
//         };

//         fetchMe();

//         return () => {
//             mounted = false;
//         };
//     }, [token]);

//     return (
//         <AuthContext.Provider
//             value={{ token, user, isAuthenticated, isAdmin, isCustomer, loading, login, logout }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
// export default useAuth;
