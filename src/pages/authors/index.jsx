import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';


// Get static props to fetch the list of authors
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'authors.json');
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return { props: { authors: [] } };
  }
  const jsonData = fs.readFileSync(filePath);
  const authors = JSON.parse(jsonData);

  return { props: { authors } };
}

// Index page component to list authors
export default function IndexPage({ authors }) {
  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>Authors</title>
      </Head>
      <div className="rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4">Authors</h1>
        <ul className="list-disc pl-6 space-y-2">
          {authors.map((author) => (
            <li key={author.name} className="text-lg">
              <Link href={`/authors/${author.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <span className="text-blue-500 hover:underline">{author.name.replace(/-/g, ' ')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
