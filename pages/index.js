import Head from 'next/head';
import Link from 'next/link';

import Footer from './../components/footer';

export async function getStaticProps() {
  const src = await fetch('https://blog.ted.com/wp-json/wp/v2/posts');
  const resp = await src.json();
  const posts = await [ ...resp ];
  return {
    props: {
      posts
    }
  }
}

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Impariamo <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Contenuti <i>presi in prestito</i> da <code>https://blog.ted.com/</code>
        </p>

        <hr />

        <h3 className="title">Pagine statiche</h3>
        <div className="grid">
          <Link href="/about">
            <a className="card">
              <h3>About TED Blog &rarr;</h3>
              <p></p>
            </a>
          </Link>

          <Link href="/future">
            <a className="card">
              <h3>Peter Weyland at TED2023</h3>
              <p>I will change the world</p>
            </a>
          </Link>

        </div>

        <h3 className="title">Articoli</h3>
        <div className="grid">
          {posts.map((post, i) => <Link key={i} href={'/post/' + post.id}>
            <a className="card">
              <h3>{post.title.rendered}</h3>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
            </a>
          </Link>) }
        </div>
      </main>

      <Footer />

    </div>
  )
}
