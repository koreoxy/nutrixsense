"use client";

import { generatePagination } from "@/utils/utils";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "single" | "middle" | undefined;
    isActive: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
        "rounded-l-sm": position === "first" || position === "single",
        "rounded-r-sm": position === "last" || position === "single",
        "z-10 bg-primary border-primary dark:bg-secondary dark:border-secondary text-white":
          isActive,
        "hover:bg-gray-100 dark:hover:bg-primary":
          !isActive && position !== "middle",
        "text-gray-300 pointer-event-none": position === "middle",
      }
    );
    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  };

  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border rounded",
      {
        "pointer-events-none text-gray-300 dark:text-muted": isDisabled,
        "hover:bg-secondary dark:hover:bg-primary": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );

    const icon =
      direction === "left" ? (
        <ChevronLeft size={20} />
      ) : (
        <ChevronRight size={20} />
      );

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link href={href} className={className}>
        {icon}
      </Link>
    );
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

export default Pagination;
