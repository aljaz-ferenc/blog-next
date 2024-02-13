// import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'WebBlog | Welcome',
  description: 'Welcome Page of WebBlog',
}

export default function Home() {
  return (
    <main className="page-container">
           <div className="home__image">
        <div className="image__container">
          {/* <img src={bgImg} alt="" /> */}
        </div>
        {/* <h1>React Blog</h1> */}
      </div>
      <div className="home__intro">
        <p>Hey there, welcome to my blog!</p>
        <p>
          This blog is all about my journey of learning web development,
          where I share my experiences and insights along the way. I
          started this blog as a way to document my progress, take notes and share my
          learnings with others who are also interested in frontend web
          development. I understand how overwhelming it can be to navigate the
          plethora of technologies and tools that are out there and I hope you
          will find this information useful. 
        </p>
          {/* <Link className="home__btn" to='posts'>Read All Posts</Link> */}
      </div>
      <div className="home__popular">
      <hr style={{margin: "2rem 0"}}/>
      <Link href='/posts'>Go to posts</Link>
        <h2>Newest posts</h2>
        {/* {posts.length > 0 && <div className="popular__container">
          <BlogCard image={posts[0].mainImage.asset.url} title={posts[0].title} slug={`posts/${posts[0].slug.current}`} description={posts[0].description}></BlogCard>
          <BlogCard image={posts[1].mainImage.asset.url} title={posts[1].title} slug={`posts/${posts[1].slug.current}`} description={posts[1].description}></BlogCard>
        </div>} */}
      </div> 
    </main>
  );
}
