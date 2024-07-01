// AuthorPage.js
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { allBlogs } from "contentlayer/generated";
import { sortBlogs } from "@/utils";
import RecentPosts from "@/components/Authors/RecentPosts";
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'authors.json');
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return { paths: [], fallback: false };
  }
  const jsonData = fs.readFileSync(filePath);
  const authors = JSON.parse(jsonData);

  const paths = authors.map(author => ({
    params: { name: author.name.replace(/\s+/g, '-').toLowerCase() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'authors.json');
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return { props: {} };
  }
  const jsonData = fs.readFileSync(filePath);
  const authors = JSON.parse(jsonData);

  const author = authors.find(author =>
    author.name.replace(/\s+/g, '-').toLowerCase() === params.name
  );

  return { props: { author } };
}

export default function AuthorPage({ author }) {
  if (!author) {
    return <div>Author not found</div>;
  }

  const links = author.links;

  return (
    <div className="container mx-auto">
      <Head>
        <title>{author.name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')} | Author | SERVER X</title>
      </Head>
      <div className="flex flex-col items-center justify-center gap-4 pt-4">
        <h1 className="text-4xl font-bold mb-4 capitalize">{author.name.replace(/-/g, ' ')}</h1>
        <div className=''>
          <Image
            className='w-60 h-60 rounded-full'
            src={author.profile_img}
            width={0} height={0}
            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col">
          <div className="mx-10 lg:mx-0 pt-8 flex flex-wrap items-center justify-center text-center gap-4">
            {Object.entries(links).map(([key, url]) => (
              url && url.trim() !== "" && (
                <Link key={key} href={url} target='blank' className="px-3 py-1 rounded-md text-sm text-foreground-light hover:text-dark dark:text-light/75 hover:dark:text-light font-medium bg-foreground-light/30 dark:bg-[#292929] hover:bg-[#292929] hover:dark:bg-[#1d1d1d] transition-all duration-300 ease-in-out border border-light-secondary hover:border-bord-light dark:border-dark-primary hover:dark:border-bord-dark">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              )
            ))}
          </div>
        </div>
        <div className={`ancor-link text-sm pt-4`}>
          <ReactMarkdown>{author.about}</ReactMarkdown>
        </div>
        <div className='mt-8'>
          <RecentPosts blogs={allBlogs} author={author.name} />
        </div>
      </div>
    </div>
  );
}
