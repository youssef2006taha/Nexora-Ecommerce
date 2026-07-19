import React, { useState, useEffect, useCallback } from "react";
import {
  FiMail,
  FiPhone,
  FiEdit2,
  FiX,
  FiCheck,
  FiPlus,
  FiLogOut,
  FiLock,
  FiMapPin,
} from "react-icons/fi";

const API_BASE = "https://e-commerce-api-3wara.vercel.app";

const emptyAddress = {
  country: "",
  city: "",
  street: "",
  building: "",
  postalCode: "",
};

// small helper so i don't repeat the auth header everywhere
function authHeaders(extra = {}) {
  const token = localStorage.getItem("koda-token");
  return {
    ...extra,
    Authorization: token ? `Bearer ${token}` : "",
  };
}

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", phone: "", avatar: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [addingAddress, setAddingAddress] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setEditForm({
          username: data.user.username || "",
          phone: data.user.phone || "",
          avatar: data.user.avatar || "",
        });
      } else {
        setError(data.message || "Failed to load profile");
      }
    } catch (err) {
      setError("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/users/${user._id}`, {
        method: "PATCH",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setEditing(false);
      } else {
        setError(data.message || "Could not update profile");
      }
    } catch (err) {
      setError("Could not connect to the server");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setEditForm({
        username: user.username || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
    }
    setEditing(false);
  };

 //مش عارف الصراحه end point 
  const handleAddAddress = async () => {
    if (!user) return;
    const { country, city, street, building, postalCode } = addressForm;
    if (!country || !city || !street || !building || !postalCode) {
      setError("Please fill in every address field");
      return;
    }
    setAddingAddress(true);
    setError("");
    try {
      const updatedAddresses = [
        ...(user.addresses || []),
        { ...addressForm, defaultAddress: (user.addresses || []).length === 0 },
      ];
      const res = await fetch(`${API_BASE}/users/${user._id}`, {
        method: "PATCH",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ addresses: updatedAddresses }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setAddressForm(emptyAddress);
      } else {
        setError(data.message || "Could not add address");
      }
    } catch (err) {
      setError("Could not connect to the server");
    } finally {
      setAddingAddress(false);
    }
  };

// مفيش اند بوينت علشان اعدل ال باس 
  const handleSendOtp = async () => {
    if (!user) return;
    setOtpLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/change-password/send-otp`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
      } else {
        setError(data.message || "Could not send OTP");
      }
    } catch (err) {
      setError("Could not connect to the server");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleCancelPasswordChange = () => {
    setChangingPassword(false);
    setOtpSent(false);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: authHeaders(),
      });
    } finally {
      localStorage.removeItem("koda-token");
      window.location.href = "/login";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <h2 className="text-2xl font-bold text-text-primary">My Profile</h2>

        {error && (
          <div className="px-4 py-3 rounded-radius-md bg-danger-bg border border-danger/30 text-danger text-sm">
            {error}
          </div>
        )}
{/* /////////////////////////////////////////////////////////////////////// */}
        <div className="bg-bg-card border border-border rounded-radius-lg shadow-sm p-6">
          {!editing ? (
            <>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={user?.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=" + (user?.username || "U")}
                    alt={user?.username || "avatar"}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {user?.username}
                    </h3>
                    <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-radius-full bg-primary-light text-primary capitalize">
                      {user?.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-radius-md border border-border text-text-secondary hover:bg-bg-hover transition-colors"
                >
                  <FiEdit2 size={14} />
                  Edit
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <FiMail className="text-text-muted" size={16} />
                  <span className="text-text-secondary">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FiPhone className="text-text-muted" size={16} />
                  <span className={user?.phone ? "text-text-secondary" : "text-text-disabled italic"}>
                    {user?.phone || "Not set"}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-text-primary">Edit profile</h3>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-radius-md border border-border bg-bg-main text-text-primary text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">
                  Phone number
                </label>
                <input
                  type="text"
                  placeholder="Not set"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-radius-md border border-border bg-bg-main text-text-primary text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                  className="w-full px-3 py-2 rounded-radius-md border border-border bg-bg-main text-text-primary text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-radius-md bg-primary text-text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
                >
                  <FiCheck size={14} />
                  {savingProfile ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={savingProfile}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-radius-md border border-border text-text-secondary hover:bg-bg-hover transition-colors"
                >
                  <FiX size={14} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* /////////////////////////////////////////////////////////////////////*/}
        <div className="bg-bg-card border border-border rounded-radius-lg shadow-sm p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Addresses</h3>

          {user?.addresses?.length > 0 && (
            <div className="flex flex-col gap-2 mb-5">
              {user.addresses.map((addr, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 rounded-radius-md border border-border bg-bg-main"
                >
                  <FiMapPin className="text-text-muted mt-0.5" size={15} />
                  <div className="text-sm text-text-secondary">
                    {addr.street}, {addr.building} · {addr.city}, {addr.country} · {addr.postalCode}
                    {addr.defaultAddress && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-radius-full bg-primary-light text-primary">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Country"
              value={addressForm.country}
              onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
              className="px-3 py-2 rounded-radius-md border border-border bg-bg-main text-text-primary text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <input
              type="text"
              placeholder="City"
              value={addressForm.city}
              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
              className="px-3 py-2 rounded-radius-md border border-border bg-bg-main text-text-primary text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Street"
              value={addressForm.street}
              onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
              className="px-3 py-2 rounded-radius-md border border-border bg-bg-main text-text-primary text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Building"
              value={addressForm.building}
              onChange={(e) => setAddressForm({ ...addressForm, building: e.target.value })}
              className="px-3 py-2 rounded-radius-md border border-border bg-bg-main text-text-primary text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Postal code"
              value={addressForm.postalCode}
              onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
              className="px-3 py-2 rounded-radius-md border border-border bg-bg-main text-text-primary text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors sm:col-span-2"
            />
          </div>

          <button
            onClick={handleAddAddress}
            disabled={addingAddress}
            className="mt-4 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-radius-md bg-primary text-text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
          >
            <FiPlus size={14} />
            {addingAddress ? "Adding..." : "Add address"}
          </button>
        </div>

        {/* //////////////////////////////////////////////////////////////////////////////////////*/}
        <div className="bg-bg-card border border-border rounded-radius-lg shadow-sm p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Security</h3>

          {!changingPassword ? (
            <button
              onClick={() => setChangingPassword(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-radius-md border border-border text-text-secondary hover:bg-bg-hover transition-colors"
            >
              <FiLock size={14} />
              Change password
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-text-secondary">
                {otpSent
                  ? `We sent a 6-digit code to ${user?.email}. Enter it in the next step to set a new password.`
                  : `We'll send a verification code to ${user?.email} to confirm it's you before changing your password.`}
              </p>
              <div className="flex gap-3 pt-1">
                {!otpSent && (
                  <button
                    onClick={handleSendOtp}
                    disabled={otpLoading}
                    className="px-4 py-2 text-sm font-medium rounded-radius-md bg-primary text-text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
                  >
                    {otpLoading ? "Sending..." : "Send OTP"}
                  </button>
                )}
                <button
                  onClick={handleCancelPasswordChange}
                  className="px-4 py-2 text-sm font-medium rounded-radius-md border border-border text-text-secondary hover:bg-bg-hover transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ////////////////////////////////////////////////////////////////////////////////////// */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-radius-md bg-danger text-text-white hover:opacity-90 transition-opacity"
        >
          <FiLogOut size={16} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;