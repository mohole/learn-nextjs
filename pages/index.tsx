import Head from "next/head";
import Link from "next/link";

import { URL, WP_REST } from "./url";
import { Post } from "../types/pages";

import { Card } from "./../components/card";

type Props = {
  posts: Post[];
};

export async function getStaticProps() {
  const src = await fetch(WP_REST + "/posts");
  const resp = await src.json();
  const posts: Post[] = await [...resp];

  return {
    props: {
      posts,
    },
  };
}

/**
 * Just a regular React component, except it represent the whole page
 */
export default function Home({ posts }: Props) {
  return (
    <div className="container mx-auto py-5">
      {/**
       * This is a small Next utilty to edit the <head> content of the page
       */}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5">
        <h1 className="font-bold text-3xl my-5">
          Impariamo <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="my-2">
          Contenuti <i>presi in prestito</i> da <code>{URL}</code>
        </p>

        <h3 className="font-bold text-2xl my-2">Pagine statiche:</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <Card link="/edizioni-precedenti" title="Edizioni precedenti">
            <p>Fuori Mohole 2018 Archivio I volti del Fuorisalone</p>
          </Card>

          <Card link="/volti-2018" title="I volti del Fuorisalone 2018">
            <p>Gallery</p>
          </Card>
        </div>

        <h3 className="font-bold text-2xl my-2">Articoli</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-5">
          {posts.map((post, i) => (
            <Card key={i} link={"/post/" + post.id} title={post.title.rendered}>
              <div
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              ></div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
