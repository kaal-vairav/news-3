
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewsArticle, fetchNews } from '@/services/newsService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsList from '@/components/NewsList';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const { query } = useParams<{ query: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    const searchNews = async () => {
      if (!query) return;
      
      setIsLoading(true);
      setPage(1); // Reset page when query changes
      
      try {
        const data = await fetchNews(query, undefined, "relevancy", 12, 1);
        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
        setHasMore(data.articles.length === 12);
      } catch (error) {
        console.error(`Error searching for ${query}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    searchNews();
  }, [query]);

  const loadMore = async () => {
    if (!query || isLoadingMore) return;
    
    setIsLoadingMore(true);
    const nextPage = page + 1;
    
    try {
      const data = await fetchNews(query, undefined, "relevancy", 12, nextPage);
      
      if (data.articles && data.articles.length > 0) {
        setArticles([...articles, ...data.articles]);
        setPage(nextPage);
        setHasMore(data.articles.length === 12);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(`Error fetching more search results:`, error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const renderLoading = () => (
    <div className="space-y-8 animate-fade-in">
      <Skeleton className="h-12 w-2/3 max-w-sm mb-6 bg-news-light-gray" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-news-border shadow-sm">
            <Skeleton className="h-48 w-full rounded-lg mb-3 bg-news-light-gray" />
            <Skeleton className="h-5 w-full mb-2 bg-news-light-gray" />
            <Skeleton className="h-4 w-full bg-news-light-gray" />
            <Skeleton className="h-4 w-2/3 mt-2 bg-news-light-gray" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="news-container flex-grow py-8">
        {isLoading ? (
          renderLoading()
        ) : (
          <div className="animate-fade-in">
            <div className="mb-6">
              <div className="inline-flex items-center bg-white px-4 py-2 rounded-lg border border-news-border shadow-sm">
                <Search className="h-5 w-5 text-news-primary mr-2" />
                <h1 className="font-serif text-2xl font-bold text-news-dark">{query}</h1>
              </div>
              <p className="mt-2 text-news-gray">{totalResults} results found</p>
            </div>
            
            {articles.length > 0 ? (
              <>
                <NewsList 
                  title="" 
                  articles={articles} 
                  columns={3}
                />
                
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <Button 
                      onClick={loadMore} 
                      disabled={isLoadingMore}
                      className="bg-news-primary hover:bg-news-primary/80 text-white"
                    >
                      {isLoadingMore ? 'Loading...' : 'Load More'}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <p className="text-lg text-news-dark">No articles found matching "{query}"</p>
                <p className="mt-2 text-news-gray">Try different keywords or check your spelling</p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
