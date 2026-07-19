import React from "react";

const UsersManege = () => {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Users Management</h2>
          <p className="text-sm text-slate-500">Manage account roles, edit profiles, and monitor user activity.</p>
        </div>
        <button className="rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-800 transition">
          Add User
        </button>
      </div>
    </section>
  );
};

export default React.memo(UsersManege);