import BlogDetails from "@/components/Blog/BlogDetails";
import RenderMdx from "@/components/Blog/RenderMdx";
import { format, parseISO } from "date-fns";
import Tag from "@/components/Elements/Tag";
import siteMetadata from "@/utils/siteMetaData";
import { allBlogs } from "contentlayer/generated";
import { slug } from "github-slugger";
import Image from "next/image";
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const AuthorName = (name) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '_');
  return formattedName;
}

const LinkAuthorName = (name) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  return formattedName;
}

export async function getStaticPaths() {
  const paths = allBlogs.map((blog) => ({ params: { slug: blog._raw.flattenedPath } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);

  if (!blog) {
    return { notFound: true };
  }

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

  let imageList = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image.filePath === "string"
        ? [siteMetadata.siteUrl + blog.image.filePath.replace("../public", "")]
        : blog.image;
  }
  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
  });

  const authors = blog?.author ? [blog.author] : siteMetadata.author;

  const metadata = {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + blog.url,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: ogImages,
    },
  };

  return {
    props: {
      blog,
      metadata,
    },
  };
}

export default function BlogPage({ blog, metadata }) {
  const defaultImageUrl = '/packages/articles/featured.png';
  const imageUrl = blog?.url ? `/packages${blog.url}/featured.png` : defaultImageUrl;
  const [imgSrc, setImgSrc] = useState(imageUrl);

  const handleError = () => {
    setImgSrc(defaultImageUrl);
  };

  const router = useRouter();

  useEffect(() => {
    if (blog?.url) {
      setImgSrc(`/packages${blog.url}/featured.png`);
    } else {
      setImgSrc(defaultImageUrl);
    }
  }, [blog]);

  if (router.isFallback) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  if (!blog) {
    return <ErrorPage statusCode={404} />;
  }

  const {
    url = "#",
    image = {},
    title = "Untitled",
    tags = [],
    publishedAt = new Date(),
  } = blog;

  const {
    filePath = "",
    blurhashDataUrl = "",
    width = 0,
    height = 0,
  } = image;

  let imageList = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image.filePath === "string"
        ? [siteMetadata.siteUrl + blog.image.filePath.replace("../public", "")]
        : blog.image;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": blog.title,
    "description": blog.description,
    "image": imageList,
    "datePublished": new Date(blog.publishedAt).toISOString(),
    "dateModified": new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    "author": [{
      "@type": "Person",
      "name": blog?.author ? [blog.author] : siteMetadata.author,
      "url": siteMetadata.twitter,
    }]
  };

  return (
    <>
      <Head>
        <title>{metadata.title} | by {blog.author} | {format(parseISO(blog.publishedAt), "LLLL d, yyyy")} | Articles | SERVER X</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="article:published_time" content={metadata.openGraph.publishedTime} />
        <meta property="article:modified_time" content={metadata.openGraph.modifiedTime} />
        {metadata.openGraph.authors.map((author, index) => (
          <meta key={`author-${index}`} property="article:author" content={author} />
        ))}
        {metadata.openGraph.images.map((image, index) => (
          <meta key={`og-image-${index}`} property="og:image" content={image.url} />
        ))}

        {/* Twitter card tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        {metadata.twitter.images.map((image, index) => (
          <meta key={`twitter-image-${index}`} name="twitter:image" content={image.url} />
        ))}
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen mb-40 !text-sm px-24 xl:px-0 lg:px-0">
        <div className="mb-8 text-center relative w-full h-[30vh] bg-dark rounded-t-xl">
          <div className="w-full z-[5] flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Tag
              name={blog.tags[0]}
              link={`/categories/${slug(blog.tags[0])}`}
              className="px-6 text-sm py-2"
            />
            <h1
              className="inline-block mt-6 font-semibold capitalize text-light text-3xl md:text-xl lg:text-3xl !leading-normal relative w-5/6 font-display"
            >
              {blog.title}
            </h1>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-full rounded-t-xl bg-dark/40 dark:bg-dark/20" />
          <Image
            src={imgSrc}
            onError={handleError}
            placeholder="blur"
            blurDataURL={imgSrc}
            alt={blog.title}
            width={width}
            height={height}
            className="aspect-square w-full h-full object-cover object-center rounded-t-xl"
            priority
            sizes="100vw"
          />
          <div className="flex flex-wrap items-center justify-center p-0.5 text-center text-xs lg:line-clamp-1">{blog.description}</div>
        </div>

        <div className="flex flex-col lg:hidden rowdies-sans pt-4"> 
          <BlogDetails blog={blog} slug={blog._raw.flattenedPath} />
        </div>

        <div className="grid grid-cols-11 gap-16 lg:gap-8 py-6 lg:py-0 sxl:gap-16 montserrat">
          <RenderMdx blog={blog} className={`order-2 lg:order-1`} />
          <div className="col-span-3 lg:col-span-11 order-2 lg:order-1">
            <div className="sticky top-20">
              <details
                // id="scroll-primary-serverx2"
                className={`border-[1px] border-solid border-light-secondary dark:border-dark-secondary transition-all duration-300 ease-in-out text-dark dark:text-light rounded-lg p-4 max-h-[80vh] overflow-hidden overflow-y-auto customScrollbar`}
                open
              >
                <summary className="font-semibold capitalize cursor-pointer">
                  Table Of Content
                </summary>
                <ul className="mt-4 font-in text-sm">
                  {blog.toc.map((heading) => (
                    <li key={`#${heading.slug}`} className="py-1">
                      <Link
                        href={`#${heading.slug}`}
                        data-level={heading.level}
                        className="data-[level=two]:pl-0  data-[level=two]:pt-2
                     data-[level=two]:border-t border-solid border-light-secondary dark:border-dark-secondary transition-all duration-300 ease-in-out
                     data-[level=three]:pl-4
                     sm:data-[level=three]:pl-6
                     flex items-center justify-start text-dark dark:text-light"
                        onClick={(e) => {
                          e.preventDefault();
                          const targetElement = document.getElementById(heading.slug);
                          if (targetElement) {
                            window.scrollTo({
                              top: targetElement.offsetTop - 80,
                              behavior: "smooth"
                            });
                          }
                        }}
                      >
                        {heading.level === "three" ? (
                          <span className="flex w-1 h-1 rounded-full bg-dark mr-2">
                            &nbsp;
                          </span>
                        ) : null}
                        <span className="hover:underline">{heading.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              <Link
                href={`../authors/${LinkAuthorName(blog.author)}`}
                target="_blank"
                className="mt-6 flex gap-2"
              >
                <Image
                  src={`/packages/authors/${AuthorName(blog.author)}.jpg`}
                  blurDataURL={blurhashDataUrl}
                  alt={blog.author}
                  width={width}
                  height={height}
                  className="w-10 h-10 object-cover object-center rounded-full"
                  priority
                  sizes="100vw"
                />
                <div className="flex flex-col items-start justify-center">
                  <div className="text-xs -my-1">Author</div>
                  <div className="hover:text-blue-500 dark:hover:text-primary-light font-semibold">{blog.author}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
