
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NewsArticle, fetchNews } from '@/services/newsService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import NewsList from '@/components/NewsList';
import { ChevronRight, Calendar, User } from 'lucide-react';
import { formatRelative } from 'date-fns';

const ArticlePage = () => {
  const { title } = useParams<{ title: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!title) return;
      
      setIsLoading(true);
      try {
        // Decode the title and fetch articles that match this title
        const decodedTitle = decodeURIComponent(title);
        const keywordMatch = decodedTitle.split(' ').slice(0, 3).join(' '); // First 3 words as keywords
        
        const data = await fetchNews(keywordMatch, undefined, "relevancy", 10);
        
        // Find the exact article by title
        const foundArticle = data.articles.find(a => a.title === decodedTitle);
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Filter out the current article from related articles
          const filteredArticles = data.articles.filter(a => a.title !== decodedTitle).slice(0, 4);
          setRelatedArticles(filteredArticles);
        } else if (data.articles.length > 0) {
          // If exact match not found, use the first result
          setArticle(data.articles[0]);
          
          // Use the rest for related articles
          setRelatedArticles(data.articles.slice(1, 5));
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [title]);

  const renderLoading = () => (
    <div className="max-w-4xl mx-auto space-y-4">
      <Skeleton className="h-10 w-3/4 mb-2 bg-news-light-gray" />
      <Skeleton className="h-6 w-1/2 mb-6 bg-news-light-gray" />
      <Skeleton className="h-72 w-full rounded-lg mb-6 bg-news-light-gray" />
      <Skeleton className="h-4 w-full bg-news-light-gray" />
      <Skeleton className="h-4 w-full bg-news-light-gray" />
      <Skeleton className="h-4 w-5/6 bg-news-light-gray" />
      <Skeleton className="h-4 w-full mt-2 bg-news-light-gray" />
      <Skeleton className="h-4 w-full bg-news-light-gray" />
      <Skeleton className="h-4 w-4/5 bg-news-light-gray" />
    </div>
  );

  const formatDate = (dateString: string) => {
    return formatRelative(new Date(dateString), new Date());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="news-container flex-grow py-8">
        {isLoading ? (
          renderLoading()
        ) : article ? (
          <div className="animate-fade-in">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="mb-4 flex items-center text-sm text-news-gray">
                <Link to="/" className="text-news-primary hover:underline">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                {article.source.name && (
                  <span>{article.source.name}</span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-news-dark">{article.title}</h1>
              
              <div className="flex items-center text-sm text-news-gray mb-6 border-b pb-4 border-news-border">
                {article.author && (
                  <div className="flex items-center mr-4">
                    <User className="h-4 w-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
              
              {article.urlToImage && (
                <div className="mb-6">
                  <img 
                    src={article.urlToImage} 
                    alt={article.title} 
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
              
              <div className="prose max-w-none">
                <p className="text-xl mb-4 font-serif text-news-dark">{article.description}</p>
                <div className="mt-6">
                  {/* Display article content */}
                  {article.content ? (
                    <p className="text-news-dark">{article.content.split('[+')[0]}</p>
                  ) : (
                    <p className="text-news-dark">{article.description}</p>
                  )}
                  
                  <div className="mt-8 p-4 bg-news-light rounded-lg border border-news-border">
                    <p className="text-news-dark">
                      For the full article, please visit{" "}
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-news-primary font-medium hover:underline"
                      >
                        {article.source.name || 'the original source'}
                      </a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {relatedArticles.length > 0 && (
              <div className="mt-12">
                <NewsList 
                  title="Related Stories" 
                  articles={relatedArticles} 
                  columns={2}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold font-serif text-news-dark">Article Not Found</h2>
            <p className="mt-4 text-news-gray">
              The article you're looking for couldn't be found. Please check the URL or 
              <Link to="/" className="text-news-primary hover:underline ml-1">
                return to the homepage
              </Link>.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
