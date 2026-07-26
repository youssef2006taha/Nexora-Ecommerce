import React from "react";
import { Skeleton } from "@mui/material";

const skeletonClass = "!bg-secondary/30";

const UsersTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <tr key={index} className="bg-bg-card !h-[81px]">
          {/* User */}
          <td className="py-4 px-6 border-b border-secondary/15 dark:border-secondary/20 w-[40%]">
            <div className="flex items-center gap-4">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                className={skeletonClass}
              />

              <div className="flex flex-col gap-2 w-full">
                <Skeleton
                  variant="text"
                  width={120}
                  height={20}
                  className={skeletonClass}
                />
                <Skeleton
                  variant="text"
                  width={180}
                  height={18}
                  className={skeletonClass}
                />
              </div>
            </div>
          </td>

          {/* Role */}
          <td className="py-4 px-6 text-center border-b border-secondary/15 dark:border-secondary/20 w-[20%]">
            <div className="flex justify-center">
              <Skeleton
                variant="rounded"
                width={90}
                height={28}
                className={`!rounded-full ${skeletonClass}`}
              />
            </div>
          </td>

          {/* Verification */}
          <td className="py-4 px-6 text-center border-b border-secondary/15 dark:border-secondary/20 w-[20%]">
            <div className="flex justify-center">
              <Skeleton
                variant="text"
                width={100}
                height={20}
                className={skeletonClass}
              />
            </div>
          </td>

          {/* Actions */}
          <td className="py-4 px-6 text-center border-b border-secondary/15 dark:border-secondary/20 w-[20%]">
            <div className="flex justify-center items-center gap-3">
              <Skeleton
                variant="rounded"
                width={32}
                height={32}
                className={skeletonClass}
              />
              <Skeleton
                variant="rounded"
                width={32}
                height={32}
                className={skeletonClass}
              />
              <Skeleton
                variant="rounded"
                width={32}
                height={32}
                className={skeletonClass}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default React.memo(UsersTableSkeleton);
