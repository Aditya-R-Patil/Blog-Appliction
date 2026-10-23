import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Feather, FileText, Pencil, Trash2, Loader2, ArrowRight, User } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/post")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


const deletePost = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmDelete) {
    return;
  }

  axios
    .delete(`http://localhost:8080/post/${id}`)
    .then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    })
    .catch((error) => {
      console.log(error);
    });
};



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Latest Posts</h1>
          <p className="mt-3 text-lg text-gray-500">
            Explore the latest posts from our community.
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-500 text-sm">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-50 mb-6">
              <FileText className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No posts available yet.</h2>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Be the first to share something with the community.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm hover:from-blue-600 hover:to-indigo-700 hover:shadow-md active:scale-95 transition-all duration-200"
            >
              <Feather className="w-4 h-4" />
              Create Post
            </Link>
          </div>
        ) : (
          /* Post grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                {/* Card accent header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />

                <div className="flex flex-col flex-1 p-6">
                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Content preview */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {post.contend}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-5 mt-auto">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-700">{post.author}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <Link
                      to={`/post/${post.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm hover:from-blue-600 hover:to-indigo-700 hover:shadow active:scale-95 transition-all duration-200"
                    >
                      Read More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/edit/${post.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 transition-all duration-200 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
