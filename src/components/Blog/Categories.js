import { slug } from "github-slugger";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Category from "./Category";

const Categories = ({ categories, currentSlug }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedCategories = isExpanded ? categories : categories.slice(0, 10);

  return (
    <div className="w-full mt-10">
      <AnimatePresence initial={false}>
        <motion.div
          className="border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex flex-wrap font-medium md:mx-0 items-center justify-center sm:justify-evenly md:text-xs"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          key="categories"
        >
          {displayedCategories.map((cat) => (
            <Category
              key={cat}
              link={`/articles/categories/${cat}`}
              name={cat}
              active={currentSlug === slug(cat)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <button
        onClick={toggleExpand}
        className="w-full px-4 py-2 mt-4 text-sm md:text-xs font-medium text-white bg-accent dark:bg-primary-light rounded-lg transition-transform duration-150 ease-in-out transform hover:bg-accent-dark dark:hover:bg-primary-dark active:bg-accent-darker dark:active:bg-primary-darker active:scale-95 shadow-md active:shadow-lg"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default Categories;
