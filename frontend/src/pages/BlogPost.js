import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/CTASection';
import { getBlogPost, getBlogPosts } from '@/lib/api';
import useScrollAnimation from '@/hooks/useScrollAnimation';

/**
 * BlogPost Page - Pfizer-Inspired Design
 * 
 * Single blog post view with:
 * - Featured image
 * - Article content
 * - Author info
 * - Related posts
 */
const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [headerRef] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPost = async () => {
    try {
      const [postData, allPostsData] = await Promise.all([
        getBlogPost(slug),
        getBlogPosts()
      ]);
      
      setPost(postData);
      
      // Get related posts from same category
      const related = allPostsData
        .filter(p => p.slug !== slug && p.category === postData?.category)
        .slice(0, 3);
      setRelatedPosts(related);
    } catch (e) {
      console.error('Error fetching blog post:', e);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return 5;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          POST HEADER
          ============================================ */}
      <section 
        className="pt-28 sm:pt-32 pb-10 sm:pb-12 bg-[#F9FAFB]"
        aria-labelledby="post-heading"
      >
        <div 
          ref={headerRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 fade-in-section" 
          style={{ maxWidth: '800px' }}
        >
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog')}
            className="mb-6 text-gray-600 hover:text-[#0052CC]"
          >
            <ArrowLeft size={18} className="mr-2" aria-hidden="true" />
            Back to Insights
          </Button>
          
          {/* Category Badge */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-[#0052CC] text-white rounded-full text-sm font-semibold">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>
          )}
          
          {/* Title */}
          <h1 
            id="post-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001F3F] mb-6 leading-tight"
          >
            {post.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600">
            {post.author && (
              <div className="flex items-center gap-2">
                <User size={18} className="text-[#0052CC]" aria-hidden="true" />
                <span className="font-medium text-gray-700">{post.author}</span>
              </div>
            )}
            {post.published_at && (
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#0052CC]" aria-hidden="true" />
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#0052CC]" aria-hidden="true" />
              <span>{calculateReadTime(post.content)} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED IMAGE
          ============================================ */}
      {post.featured_image && (
        <section className="bg-[#F9FAFB] pb-12 sm:pb-16">
          <div 
            className="container mx-auto px-4 sm:px-6 lg:px-8" 
            style={{ maxWidth: '900px' }}
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          POST CONTENT
          ============================================ */}
      <section className="py-12 sm:py-16 bg-white">
        <article 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          style={{ maxWidth: '700px' }}
        >
          {/* Excerpt/Lead */}
          {post.excerpt && (
            <p className="text-lg sm:text-xl text-gray-700 font-medium mb-10 leading-relaxed border-l-4 border-[#0052CC] pl-6">
              {post.excerpt}
            </p>
          )}
          
          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {post.content && post.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start flex-wrap gap-2">
                <span className="text-sm font-semibold text-gray-700 mr-2">Tags:</span>
                {post.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 bg-[#E3F2FD] text-[#0052CC] rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </section>

      {/* ============================================
          AUTHOR INFO
          ============================================ */}
      {post.author && (
        <section className="py-12 sm:py-16 bg-[#F9FAFB]">
          <div 
            className="container mx-auto px-4 sm:px-6 lg:px-8" 
            style={{ maxWidth: '700px' }}
          >
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md border border-gray-100">
              <div className="flex items-start gap-5">
                {/* Author Avatar */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                  <User size={28} className="text-[#0052CC]" aria-hidden="true" />
                </div>
                
                {/* Author Info */}
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Written by</p>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-1">
                    {post.author}
                  </h3>
                  {post.author_role && (
                    <p className="text-[#0052CC] font-medium mb-3">{post.author_role}</p>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Expert pharmaceutical consultant with extensive experience in regulatory affairs and compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          RELATED POSTS
          ============================================ */}
      {relatedPosts.length > 0 && (
        <section 
          className="py-12 sm:py-16 md:py-20 bg-white"
          aria-labelledby="related-heading"
        >
          <div 
            className="container mx-auto px-4 sm:px-6 lg:px-8" 
            style={{ maxWidth: '1200px' }}
          >
            <h2 
              id="related-heading"
              className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-10 text-center"
            >
              Related Articles
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/blog/${relatedPost.slug}`);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Read ${relatedPost.title}`}
                >
                  {/* Image */}
                  {relatedPost.featured_image && (
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={relatedPost.featured_image} 
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {/* Category */}
                    {relatedPost.category && (
                      <span className="text-xs font-semibold text-[#0052CC] uppercase tracking-wide">
                        {relatedPost.category}
                      </span>
                    )}
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#001F3F] mt-2 mb-2 line-clamp-2 group-hover:text-[#0052CC] transition-colors">
                      {relatedPost.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    
                    {/* Read More */}
                    <div className="flex items-center text-[#0052CC] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      <span>Read More</span>
                      <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <CTASection
        title="Need Expert Guidance?"
        subtitle="Let's discuss how we can help accelerate your regulatory success."
        cta={{
          text: "Schedule a Consultation",
          onClick: () => navigate('/contact')
        }}
        variant="navy"
      />
    </div>
  );
};

export default BlogPost;
