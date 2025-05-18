
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewsArticle, fetchNewsByCategory } from '@/services/newsService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsList from '@/components/NewsList';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const categoryTitle = category?.charAt(0).toUpperCase() + category?.slice(1);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      if (!category) return;
      
      setIsLoading(true);
      setPage(1); // Reset page when category changes
      
      try {
        const data = await fetchNewsByCategory(category, 12, 1);
        setArticles(data.articles || []);
        setHasMore(data.articles.length === 12);
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryNews();
  }, [category]);

  const loadMore = async () => {
    if (!category || isLoadingMore) return;
    
    setIsLoadingMore(true);
    const nextPage = page + 1;
    
    try {
      const data = await fetchNewsByCategory(category, 12, nextPage);
      
      if (data.articles && data.articles.length > 0) {
        setArticles([...articles, ...data.articles]);
        setPage(nextPage);
        setHasMore(data.articles.length === 12);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(`Error fetching more ${category} news:`, error);
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
            <h1 className="news-heading mb-6 text-news-dark border-b-2 border-news-primary pb-2 inline-block">{categoryTitle || 'Category'} News</h1>
            
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
                <p className="text-lg text-news-gray">No articles found</p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
