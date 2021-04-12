import Head from 'next/head';
import Link from 'next/link';

import Footer from './../components/footer';

export async function getStaticProps({ params }) {
  const src = await fetch('https://blog.ted.com/wp-json/wp/v2/pages/55122');
  const resp = await src.json();
  const data = await { ...resp };
  return {
    props: {
      data
    }
  }
}

export default function Future({ data }) {
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
