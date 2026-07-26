import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../features/users/Thunks/GetAllUsersThunk";

import { useEffect } from "react";

import UsersPageHeader from "./Components/UsersPageHeader.jsx";
import UsersStatus from "./Components/UsersStatus.jsx";
import UsersTable from "./Components/UsersTable.jsx";

const UsersPage = () => {
  const { users } = useSelector((store) => store.users);
  const usersDispatch = useDispatch();

  // Fetch users from API and set state on mount
  useEffect(() => {
    usersDispatch(getAllUsersThunk());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex flex-col gap-8 p-6">
      <UsersPageHeader />
      <UsersStatus users={users} />
      <UsersTable />
    </div>
  );
};

export default React.memo(UsersPage);
