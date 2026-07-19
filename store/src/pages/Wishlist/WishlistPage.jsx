import React from "react";
import api from "../../api/axios";
import useAuth from "../../context/AuthContext";
import WishlistPage from "./pages/Wishlist"

const Wishlist = () => {
    return (
        <WishlistPage />
    )
};

export default React.memo(Wishlist);
