import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { getBlogPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import useScrollAnimation from '@/hooks/useScrollAnimation';

/**
 * Blog Page - Pfizer-Inspired Design
 * 
 * Features:
 * - Clean hero section
 * - Category filter with primary blue active state
 * - Blog card grid
 * - Pagination
 */
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  
  const [heroRef] = useScrollAnimation({ threshold: 0.1 });
  const [gridRef] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (e) {
      console.error('Error fetching blog posts:', e);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(posts.map(post => post.category).filter(Boolean))];
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section 
        className="bg-white pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-12"
        aria-labelledby="blog-heading"
      >
        <div 
          ref={heroRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-section"
          style={{ maxWidth: '800px' }}
        >
          <h1 
            id="blog-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001F3F] mb-4 sm:mb-6"
          >
            Insights & Resources
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            Expert perspectives on pharmaceutical regulatory strategy, compliance, and industry trends
          </p>
        </div>
      </section>

      {/* ============================================
          CATEGORY FILTER
          ============================================ */}
      <section 
        className="bg-[#F9FAFB] py-6 sm:py-8 border-y border-gray-200"
        aria-label="Filter by category"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: '1200px' }}
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center" role="tablist">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                role="tab"
                aria-selected={selectedCategory === category}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base min-h-[44px] ${
                  selectedCategory === category
                    ? 'bg-[#0052CC] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          BLOG POSTS GRID
          ============================================ */}
      <section 
        className="bg-white py-12 sm:py-16 md:py-20"
        aria-label="Blog posts"
      >
        <div 
          ref={gridRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 fade-in-section"
          style={{ maxWidth: '1200px' }}
        >
          {filteredPosts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12 sm:py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-[#0052CC]" aria-hidden="true" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#001F3F] mb-2">
                  No posts yet
                </h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Check back soon for expert insights and resources!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 stagger-children">
                {currentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav 
                  className="flex justify-center items-center gap-2 mt-8 sm:mt-12 flex-wrap"
                  aria-label="Blog pagination"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base min-h-[44px] ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first, last, current, and adjacent pages
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-medium transition-all text-sm sm:text-base ${
                              currentPage === pageNumber
                                ? 'bg-[#0052CC] text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={currentPage === pageNumber ? 'page' : undefined}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span 
                            key={pageNumber} 
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-400"
                            aria-hidden="true"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base min-h-[44px] ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
