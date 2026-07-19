import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLoader from "../../components/UI/DashboardLoader";
import Modal from "../../components/UI/Modal";
import ProfileCard from "./sections/ProfileCard";
import AppearanceCard from "./sections/AppearanceCard";
import CredentialsCard from "./sections/CredentialsCard";
import CredentialsDetailsModal from "./sections/CredentialsDetailsModal";
import ChangePasswordForm from "./sections/ChangePasswordForm";
import ChangePhotoForm from "./sections/ChangePhotoForm";
import { useTheme } from "../../hooks/useTheme";

const BASE_URL = "https://e-commerce-api-3wara.vercel.app";

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // "password" | "photo" | "details" | null

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${BASE_URL}/auth/me`, {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = response.data;
        if (data?.success && data?.user) {
          setUser(data.user);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Profile Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const closeModal = () => setActiveModal(null);

  const handlePhotoSuccess = (newAvatarUrl) => {
    setUser((prev) => ({ ...prev, avatar: newAvatarUrl }));
  };

  if (loading) return <DashboardLoader />;

  if (error || !user) {
    return (
      <div className="text-center py-10 text-rose-500">
        Failed to load profile data
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8  mx-auto w-full min-h-screen">
      <div className="bg-bg-card border border-border rounded-[20px] p-8 w-full shadow-sm dark:shadow-none">
        <h4 className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">
          Settings
        </h4>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Preferences and integrations
        </h1>
        <p className="text-text-muted text-sm">
          Theme mode, account credentials, and dashboard preferences are managed here.
        </p>
      </div>

      <ProfileCard
        user={user}
        onChangePhoto={() => setActiveModal("photo")}
        onEditProfile={() => setActiveModal("photo")}
        onViewDetails={() => setActiveModal("details")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <AppearanceCard theme={theme} onToggleTheme={toggleTheme} />
        <CredentialsCard
          user={user}
          onChangePassword={() => setActiveModal("password")}
        />
      </div>

      <Modal
        isOpen={activeModal === "password"}
        onClose={closeModal}
        title="Security"
        subtitle="Update your account password."
      >
        <ChangePasswordForm onClose={closeModal} />
      </Modal>

      <Modal
        isOpen={activeModal === "photo"}
        onClose={closeModal}
        title="Profile Photo"
        subtitle="Update your profile picture URL."
      >
        <ChangePhotoForm
          userId={user._id}
          currentAvatar={user?.avatar}
          onClose={closeModal}
          onSuccess={handlePhotoSuccess}
        />
      </Modal>

      <Modal
        isOpen={activeModal === "details"}
        onClose={closeModal}
        title="Account Details"
        subtitle="Full profile information."
      >
        <CredentialsDetailsModal user={user} />
      </Modal>
    </div>
  );
};

export default React.memo(SettingsPage);