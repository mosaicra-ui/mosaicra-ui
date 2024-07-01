import { cx } from "@/utils";
import Link from "next/link";
import React from "react";

const Tag = ({ link = "#", name, ...props }) => {
  return (
    <Link
      href={link}
      className={cx(
        `inline-block my-2 py-2 !mx-2 px-4 bg-dark text-light rounded-full capitalize border-2 border-solid border-light hover:scale-105 transition-all ease duration-200 text-sm lg:text-xs tag-${name}`,
        props.className,
      )}
    >
      {name}
    </Link>
  );
};

export default Tag;
