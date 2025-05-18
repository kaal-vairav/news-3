
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '@/services/newsService';

interface CategorySectionProps {
  title: string;
  articles: NewsArticle[];
  category: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, articles, category }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <section className="news-section border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="news-subheading text-news-dark-blue">{title}</h2>
        <Link to={`/category/${category}`} className="text-news-light-blue text-sm font-medium hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Article */}
        <div className="md:col-span-2">
          <Link to={`/article/${encodeURIComponent(mainArticle.title)}`} className="group">
            <div className="rounded-lg overflow-hidden mb-3 aspect-video">
              <img 
                src={mainArticle.urlToImage || 'https://placehold.co/800x600/e2e8f0/1e293b?text=News+Image'} 
                alt={mainArticle.title} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-news-red">{mainArticle.title}</h3>
            <p className="text-news-gray mt-2">{mainArticle.description}</p>
            <div className="mt-3 flex items-center text-xs text-news-gray">
              <span>{mainArticle.source.name}</span>
              <span className="mx-2">•</span>
              <span>{new Date(mainArticle.publishedAt).toLocaleDateString()}</span>
            </div>
          </Link>
        </div>

        {/* Side Articles */}
        <div className="md:col-span-1">
          <div className="space-y-4">
            {sideArticles.map((article, index) => (
              <Link 
                key={index} 
                to={`/article/${encodeURIComponent(article.title)}`} 
                className="flex group"
              >
                <div className="w-1/3 aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={article.urlToImage || 'https://placehold.co/800x600/e2e8f0/1e293b?text=News+Image'} 
                    alt={article.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 pl-3">
                  <h4 className="text-sm font-medium group-hover:text-news-red line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-news-gray mt-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
