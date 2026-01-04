import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import ImageWithLoading from './ImageWithLoading';

/**
 * BlogCard Component - Pfizer-Inspired Design
 * 
 * Features:
 * - White card with rounded corners
 * - 16:9 aspect ratio image
 * - Category badge in primary blue
 * - Navy title, gray excerpt
 * - Read time indicator
 * - Hover effects
 * 
 * @param {object} post - Blog post data
 */
const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  // Calculate read time (200 words per minute)
  const calculateReadTime = (content) => {
    if (!content) return '5';
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200).toString();
  };

  const readTime = calculateReadTime(post.content || post.excerpt);

  const handleClick = () => {
    navigate(`/blog/${post.slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${post.title}`}
    >
      {/* Featured Image - 16:9 aspect ratio */}
      <div className="aspect-video overflow-hidden bg-gray-100 relative">
        {post.featured_image ? (
          <ImageWithLoading
            src={post.featured_image} 
            alt={post.title || 'Blog post featured image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            skeletonClassName="w-full h-full"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB]" 
            role="img" 
            aria-label="No featured image"
          >
            <span className="text-[#0052CC] text-sm font-medium">No image</span>
          </div>
        )}
        
        {/* Category Badge */}
        {post.category && (
          <span className="absolute top-4 left-4 bg-[#0052CC] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={14} aria-hidden="true" />
            <span>{readTime} min read</span>
          </div>
          {post.published_at && (
            <>
              <span aria-hidden="true">•</span>
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </>
          )}
        </div>
        
        {/* Title - Navy */}
        <h3 className="text-lg sm:text-xl font-bold text-[#001F3F] mb-2 line-clamp-2 group-hover:text-[#0052CC] transition-colors">
          {post.title}
        </h3>
        
        {/* Excerpt - Gray */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {post.excerpt || 'Read this article to learn more...'}
        </p>
        
        {/* Read More Link - Primary Blue */}
        <div className="flex items-center text-[#0052CC] font-semibold group-hover:translate-x-1 transition-transform min-h-[44px]">
          <span className="text-sm">Read Article</span>
          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
