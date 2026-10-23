import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ArrowLeft, User, Loader2, Feather } from "lucide-react";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="mt-4 text-gray-500 text-sm">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-4">
            <Feather className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Post not found</h2>
          <p className="text-gray-500 mb-6">This post may have been deleted.</p>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm hover:from-blue-600 hover:to-indigo-700 hover:shadow-md active:scale-95 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Back button */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </a>

        {/* Article card */}
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Accent bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />

          <div className="p-6 sm:p-8 lg:p-12">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author section */}
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-100">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Written by
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {post.author}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                {post.contend}
              </p>
            </div>
          </div>
        </article>

        {/* Bottom back button */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-blue-600 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </a>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
