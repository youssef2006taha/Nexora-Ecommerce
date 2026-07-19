import React from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 py-3">
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-[10px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
        <Icon size={15} />
      </div>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
        {label}
      </p>
    </div>
    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-right truncate max-w-[150px]">
      {value ?? "—"}
    </p>
  </div>
);

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CredentialsDetailsModal = ({ user }) => {
  if (!user) return null;

  const defaultAddress = user.addresses?.find((a) => a.defaultAddress) || user.addresses?.[0];

  return (
    <div className="h-90 overflow-auto hide-scrollbar divide-y divide-slate-100 dark:divide-slate-800">
      <Row icon={FiUser} label="Username" value={user.username} />
      <Row icon={FiMail} label="Email" value={user.email} />
      <Row icon={FiPhone} label="Phone" value={user.phone} />
      <Row icon={FiShield} label="Role" value={user.role} />
      <Row
        icon={user.isVerified ? FiCheckCircle : FiXCircle}
        label="Verified"
        value={user.isVerified ? "Yes" : "No"}
      />
      {defaultAddress && (
        <Row
          icon={FiMapPin}
          label="Address"
          value={`${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.country}`}
        />
      )}
      <Row icon={FiCalendar} label="Joined" value={formatDate(user.createdAt)} />
      <Row icon={FiClock} label="Last Updated" value={formatDate(user.updatedAt)} />
      <Row icon={FiUser} label="Token" value={localStorage.getItem("token")} />
    </div>
  );
};

export default React.memo(CredentialsDetailsModal);