import Container from "components/container";
import SEO from "components/seo";
import MoreStories from "components/more-stories";
import HeroPost from "components/posts/hero-post";
import Intro from "components/intro";
import Layout from "components/layout";
import { getAllPosts } from "lib/api";

export function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "id",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}

export default function Home({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const siteTitle = "Fictionally Irrlevant";
  return (
    <>
      <Layout defaultSEOImage={true}>
        <SEO title={siteTitle} />
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              id={heroPost.id}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}
