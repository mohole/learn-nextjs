import Head from 'next/head';
import Link from 'next/link';

import Footer from './../../components/footer';

import { WP_REST } from './../../url';

const url = WP_REST + '/posts';

export async function getStaticPaths() {
  const res = await fetch(url);
  const posts = await res.json();
  const paths = posts.map(post => ({ params: {
    id: post.id.toString()
  } }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const src = await fetch(`${url}/${params.id}`);
  const resp = await src.json();
  const data = await { ...resp };
  return {
    props: {
      data
    }
  }
}

export default function Post({ data }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{data.title.rendered} </h1>

        <p className="description">
          typed <code>{new Date(data.date).toLocaleDateString()}</code>
        </p>

        <hr />

        <div className="grid">
          <article dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>

        <p className="description"><Link href="/"><a>&lt; Back to Home</a></Link></p>

      </main>

      <Footer />

    </div>
  )
}
