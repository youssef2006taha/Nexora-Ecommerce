import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../features/users/Thunks/GetAllUsersThunk";

import { useState, useEffect } from "react";

import UsersPageHeader from "./Components/UsersPageHeader.jsx";
import UsersStatus from "./Components/UsersStatus.jsx";
import UsersTable from "./Components/UsersTable.jsx";

const UsersPage = () => {
  const { users } = useSelector((store) => store.users);
  const usersDispatch = useDispatch();

  const [inputSearch, setInputSearch] = useState("");

  // Fetch users from API and set state on mount
  useEffect(() => {
    usersDispatch(getAllUsersThunk());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex flex-col gap-8 p-6">
      <UsersPageHeader
        inputSearch={inputSearch}
        handleSearch={(val) => setInputSearch(val)}
      />

      <UsersStatus users={users} />

      {/* Users Table */}
      <UsersTable inputSearch={inputSearch} />
    </div>
  );
};

export default React.memo(UsersPage);
