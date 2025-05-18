
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '@/services/newsService';

interface HeroSectionProps {
  mainArticle: NewsArticle;
  sideArticles: NewsArticle[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ mainArticle, sideArticles }) => {
  return (
    <section className="news-section">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Link to={`/article/${encodeURIComponent(mainArticle.title)}`}>
              <img
                src={mainArticle.urlToImage || 'https://placehold.co/800x600/e2e8f0/1e293b?text=News+Image'}
                alt={mainArticle.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span className="breaking-news mb-2">Breaking News</span>
                <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">{mainArticle.title}</h1>
                <p className="text-white/80 text-sm mt-2 line-clamp-2">{mainArticle.description}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Side Articles */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {sideArticles.map((article, index) => (
              <Link 
                key={index} 
                to={`/article/${encodeURIComponent(article.title)}`}
                className="flex group"
              >
                <div className="w-1/3 h-24 rounded-lg overflow-hidden">
                  <img 
                    src={article.urlToImage || 'https://placehold.co/800x600/e2e8f0/1e293b?text=News+Image'} 
                    alt={article.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/3 pl-4">
                  <h2 className="font-semibold group-hover:text-news-red line-clamp-2">{article.title}</h2>
                  <p className="text-news-gray text-sm mt-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
