import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/services/firebase/firebaseConfig";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const blogList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBlogs(blogList);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Montserrat']">
        Loading blogs...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F9E4E0] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="font-['Montserrat'] text-[#B76E79] uppercase tracking-[4px] text-[14px] font-semibold">
            Beauty Journal
          </p>

          <h1 className="font-['Playfair_Display'] text-[42px] md:text-[56px] text-[#1A1A1A] mt-3">
            Our <span className="text-[#D4AF37]">Blog</span>
          </h1>

          <p className="font-['Montserrat'] text-[#6B7280] max-w-[650px] mx-auto mt-4">
            Read beauty tips, nail trends, skincare advice, and salon care guides from Celine Esthétique.
          </p>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center font-['Montserrat'] text-[#6B7280]">
            No blog posts available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-full h-[260px] bg-white overflow-hidden">
                  <img
                    src={blog.imageURL || blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <p className="font-['Montserrat'] text-[#B76E79] text-[13px] uppercase tracking-[2px] font-semibold">
                    {blog.category || "Beauty Tips"}
                  </p>

                  <h3 className="font-['Playfair_Display'] text-[26px] text-[#1A1A1A] mt-3">
                    {blog.title}
                  </h3>

                  <p className="font-['Montserrat'] text-[#6B7280] text-[14px] mt-3 line-clamp-3">
                    {blog.excerpt || blog.description || blog.content}
                  </p>

                  <button className="mt-6 bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold hover:bg-[#C5A028] transition-all duration-300">
                    READ MORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;