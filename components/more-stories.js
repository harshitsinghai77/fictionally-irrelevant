import PostPreview from "../components/posts/post-preview";

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-2 gap-24 sm:grid-cols-1 xs:grid-cols-1 xs:gap-8 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            id={post.id}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
