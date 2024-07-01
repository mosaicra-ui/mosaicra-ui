import { allBlogs } from "contentlayer/generated";
import HomeCoverSection from "@/components/Home/HomeCoverSection";
import FeaturedPosts from "@/components/Home/FeaturedPosts";
import RecentPosts from "@/components/Home/RecentPosts";
import Head from "next/head";
import siteMetadata from "@/utils/siteMetaData";

export default function Articles() {

  return (
    <>
      <Head>
        <title>Articles | SERVER X | Unite developers, create impactful products together!</title>
        <meta name="description" content={`Articles`} />
        {/* Open Graph tags */}
        <meta property="og:title" content={`Articles`} />
        <meta property="og:description" content={`Articles`} />
        <meta property="og:url" content={`/articles`} />
        <meta property="og:site_name" content={`Articles`} />
        <meta key={`og-image`} property="og:image" content={`${siteMetadata.siteUrl}/social-banner.png`} />

        {/* Twitter card tags */}
        <meta name="twitter:title" content={`Articles`} />
        <meta name="twitter:description" content={`Articles`} />
        <meta key={`twitter-image`} name="twitter:image" content={`${siteMetadata.siteUrl}/social-banner.png`} />
      </Head>
      <main className="flex flex-col items-center justify-cente mt-8 min-h-screen mb-10 rowdies-sans">
        <HomeCoverSection blogs={allBlogs} />
        <FeaturedPosts blogs={allBlogs} />
        <RecentPosts blogs={allBlogs} />
      </main>
    </>
  )
}
