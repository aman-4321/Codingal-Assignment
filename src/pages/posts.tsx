import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page + 1}&_limit=10`
      );
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Posts</h1>

        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin mx-auto"></Loader2>
            </motion.div>
          }
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                <p className="text-gray-600">{post.body}</p>
              </motion.div>
            ))}
          </div>
        </InfiniteScroll>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center py-4"
          >
            {error}
          </motion.div>
        )}

        {!hasMore && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center py-4"
          >
            No more posts to load.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Posts;
