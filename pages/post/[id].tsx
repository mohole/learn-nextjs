import Head from "next/head";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import { Post, PostParams, Params } from "./../../types/pages";
import { WP_REST } from "../../libs/url";

const url: string = WP_REST + "/posts";

export async function getStaticPaths() {
  const res = await fetch(url);
  const posts: Post[] = await res.json();
  const paths: PostParams[] = posts.map(
    (post: Post): PostParams => ({
      params: {
        id: post.id.toString(),
      },
    })
  );

  return {
    paths,
    fallback: false,
  };
}

/**
 * same as we did in the main page...
 */
export async function getStaticProps({ params }: { params: Params }) {
  const src = await fetch(`${url}/${params.id}`);
  const resp = await src.json();
  const data = await { ...resp };
  return {
    props: {
      data,
    },
  };
}

export default function PostLayout({ data }: { data: Post }) {
  return (
    <div className="container mx-auto py-5">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5">
        <h1 className="font-bold text-3xl my-5">{data.title.rendered} </h1>

        <p>
          scritto il <code>{new Date(data.date).toLocaleDateString()}</code>
        </p>

        <hr className="my-2" />

        <div className="grid">
          <article
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(data.content.rendered),
            }}
          />
        </div>

        <p className="my-7">
          <Link href="/">
            <a className="btn btn-primary">&lt; Back to Home</a>
          </Link>
        </p>
      </main>
    </div>
  );
}
