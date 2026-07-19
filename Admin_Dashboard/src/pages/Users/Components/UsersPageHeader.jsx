import React from "react";
import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CreateUserCollapse from "./CreateUserCollapse";

import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";

const ProductsPageHeader = ({ inputSearch, handleSearch }) => {
  const [openCollapse, setOpenCollapse] = useState(false);

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-8 items-stretch justify-start sm:items-center sm:justify-between lg:items-stretch lg:justify-start xl:items-center xl:justify-between p-6 bg-bg-card/75 dark:bg-bg-card rounded-3xl border border-slate-300/30 dark:border-slate-700/50 shadow">
          <div className="flex flex-col gap-2 grow-2">
            <h2 className="uppercase tracking-[0.2rem] font-bold bg-gradient-to-r from-primary-active via-primary to-primary-hover bg-clip-text text-transparent">
              User Management
            </h2>
            <h2 className="font-semibold text-3xl text-text-primary">
              Manage Users
            </h2>
          </div>

          <div className="flex flex-col items-stretch md:items-center md:flex-row gap-4 grow">
            <div className="grow flex items-center">
              <Input
                placeholder="Search users..."
                value={inputSearch}
                onChange={(e) => handleSearch(e.target.value)}
                icon={true}
                className="!h-11.5"
              />
            </div>

            <Button
              text="Add User"
              onClick={() => {
                setOpenCollapse(!openCollapse);
              }}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user-plus-icon lucide-user-plus !size-5"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
              }
              endIcon={
                openCollapse ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )
              }
            />
          </div>
        </div>

        {/* Collapse Form */}
        <CreateUserCollapse
          openCollapse={openCollapse}
          setOpenCollapse={setOpenCollapse}
        />
      </div>
    </>
  );
};

export default React.memo(ProductsPageHeader);
