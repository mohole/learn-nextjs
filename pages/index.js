import Head from 'next/head';
import Link from 'next/link';

import Footer from './../components/footer';
import { WP_REST, URL } from './../url';

export async function getStaticProps() {
  const src = await fetch(WP_REST + '/posts');
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
          Contenuti <i>presi in prestito</i> da <code>{URL}</code>
        </p>

        <hr />

        <h3 className="title">Pagine statiche</h3>
        <div className="grid">
          <Link href="/edizioni-precedenti">
            <a className="card">
              <h3>Edizioni precedenti &rarr;</h3>
              <p>Fuori Mohole 2018 Archivio I volti del Fuorisalone</p>
            </a>
          </Link>

          <Link href="/volti-2018">
            <a className="card">
              <h3>I volti del Fuorisalone 2018 &rarr;</h3>
              <p>Gallery</p>
            </a>
          </Link>

        </div>

        <h3 className="title">Articoli</h3>
        <div className="grid">
          {posts.map((post, i) => <Link key={i} href={'/post/' + post.id}>
            <a className="card">
              <h3>{post.title.rendered}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
            </a>
          </Link>) }
        </div>
      </main>

      <Footer />

    </div>
  )
}
