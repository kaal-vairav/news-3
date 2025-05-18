
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '@/services/newsService';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface NewsListProps {
  title: string;
  articles: NewsArticle[];
  columns?: 2 | 3 | 4;
}

const NewsList: React.FC<NewsListProps> = ({ title, articles, columns = 3 }) => {
  const gridClass = 
    columns === 2 ? "grid-cols-1 sm:grid-cols-2" : 
    columns === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : 
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="news-section">
      <h2 className="news-subheading mb-5 pb-2 border-b-2 border-news-primary text-news-dark">{title}</h2>
      <div className={`grid ${gridClass} gap-6`}>
        {articles.map((article, index) => (
          <Card key={index} className="article-card h-full flex flex-col">
            <Link to={`/article/${encodeURIComponent(article.title)}`} className="group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.urlToImage || 'https://placehold.co/800x600/e9ecef/6c757d?text=News+Image'} 
                  alt={article.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <CardContent className="flex flex-col flex-grow p-4">
              <Link to={`/article/${encodeURIComponent(article.title)}`} className="group">
                <h3 className="font-serif font-semibold text-news-dark group-hover:text-news-primary transition-colors duration-200 line-clamp-2 mb-2">{article.title}</h3>
              </Link>
              <p className="text-sm text-news-gray line-clamp-3 mb-4">{article.description}</p>
              <div className="mt-auto flex items-center justify-between text-xs text-news-gray">
                <span className="font-medium">{article.source.name}</span>
                <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NewsList;
