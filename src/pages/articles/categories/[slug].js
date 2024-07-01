import { allBlogs } from "contentlayer/generated";
import BlogLayoutThree from "@/components/Blog/BlogLayoutThree";
import Categories from "@/components/Blog/Categories";
import { useRouter } from 'next/router';
import Head from "next/head";
import { slug } from "github-slugger";

const CategoryPage = ({ blogs, allCategories, currentSlug }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{currentSlug} | Categories | SERVER X</title>
      </Head>
      <article className="min-h-screen flex flex-col text-dark dark:text-light">
        <div className="flex flex-col">
          <h1 className="mt-6 font-semibold text-5xl md:text-4xl lg:text-5xl">#{currentSlug}</h1>
          <span className="mt-2 inline-block">
            Discover more categories and expand your knowledge!
          </span>
          <Categories categories={allCategories} currentSlug={currentSlug} />
        </div>

        <div className="my-10 grid grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-8">
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

export async function getStaticPaths() {
  const categories = [];
  const paths = [{ params: { slug: "all" } }];

  allBlogs.forEach((blog) => {
    if (blog.isPublished) {
      blog.tags.forEach((tag) => {
        const slugified = tag.toLowerCase().replaceAll(" ", "-");
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ params: { slug: slugified } });
        }
      });
    }
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const currentSlug = params.slug;
  let blogs = allBlogs;

  if (currentSlug !== "all") {
    blogs = allBlogs.filter((blog) => {
      const hasMatchingTag = blog.tags.some((tag) => {
        const formattedTag = tag.toLowerCase().replaceAll(" ", "-");
        console.log(`Checking tag: ${formattedTag} against slug: ${currentSlug}`);
        return formattedTag === currentSlug;
      });
      console.log(`Blog: ${blog.title}, hasMatchingTag: ${hasMatchingTag}`);
      return hasMatchingTag;
    });
  }

  const allCategories = ["all", ...new Set(allBlogs.flatMap((blog) => blog.tags.map((tag) => tag.toLowerCase().replaceAll(" ", "-"))))].sort();

  return {
    props: {
      blogs,
      allCategories,
      currentSlug,
    },
  };
}

export default CategoryPage;
