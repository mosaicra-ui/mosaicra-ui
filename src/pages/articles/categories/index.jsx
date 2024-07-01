import { allBlogs } from "contentlayer/generated";
import BlogLayoutThree from "@/components/Blog/BlogLayoutThree";
import Categories from "@/components/Blog/Categories";
import Head from "next/head";

const CategoryIndexPage = ({ blogs, allCategories }) => {
  return (
    <>
      <Head>
        <title>Categories | SERVER X</title>
      </Head>
      <article className="min-h-screen flex flex-col text-dark dark:text-light">
        <div className="flex flex-col">
          <h1 className="mt-6 font-semibold text-5xl md:text-4xl lg:text-5xl uppercase">Categories</h1>
          <span className="mt-2 inline-block">
            Discover more categories and expand your knowledge!
          </span>
          <Categories categories={allCategories} currentSlug="all" />
        </div>

        <div className="my-10 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {blogs.map((blog, index) => (
            <article key={index} className="flex items-center justify-center relative">
              <BlogLayoutThree blog={blog} />
            </article>
          ))}
        </div>
      </article>
    </>
  );
};

export async function getStaticProps() {
  const blogs = allBlogs.filter(blog => blog.isPublished);
  const allCategories = ["all", ...new Set(allBlogs.flatMap(blog => blog.tags.map(tag => tag.toLowerCase().replaceAll(" ", "-"))))].sort();

  return {
    props: {
      blogs,
      allCategories,
    },
  };
}

export default CategoryIndexPage;
