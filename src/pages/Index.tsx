
import React, { useEffect, useState } from 'react';
import { NewsArticle, fetchNews, fetchTopHeadlines, fetchNewsByCategory } from '@/services/newsService';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import NewsList from '@/components/NewsList';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topHeadlines, setTopHeadlines] = useState<NewsArticle[]>([]);
  const [popularNews, setPopularNews] = useState<NewsArticle[]>([]);
  const [technologyNews, setTechnologyNews] = useState<NewsArticle[]>([]);
  const [businessNews, setBusinessNews] = useState<NewsArticle[]>([]);
  const [healthNews, setHealthNews] = useState<NewsArticle[]>([]);
  const [sportsNews, setSportsNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchAllNews = async () => {
      setIsLoading(true);
      
      try {
        // Fetch top headlines for hero section
        const headlinesData = await fetchTopHeadlines("us", undefined, 6);
        setTopHeadlines(headlinesData.articles || []);
        
        // Fetch popular news
        const popularData = await fetchNews("world", "2025-05-12", "popularity", 6);
        setPopularNews(popularData.articles || []);
        
        // Fetch category news
        const techData = await fetchNewsByCategory("technology", 5);
        setTechnologyNews(techData.articles || []);
        
        const businessData = await fetchNewsByCategory("business", 5);
        setBusinessNews(businessData.articles || []);
        
        const healthData = await fetchNewsByCategory("health", 5);
        setHealthNews(healthData.articles || []);
        
        const sportsData = await fetchNewsByCategory("sports", 5);
        setSportsNews(sportsData.articles || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllNews();
  }, []);

  const renderLoading = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-96 w-full rounded-lg bg-news-light-gray" />
        </div>
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex">
                <Skeleton className="w-1/3 h-24 rounded-lg bg-news-light-gray" />
                <div className="w-2/3 pl-4 space-y-2">
                  <Skeleton className="h-4 w-full bg-news-light-gray" />
                  <Skeleton className="h-4 w-2/3 bg-news-light-gray" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <Skeleton className="h-8 w-48 mb-4 bg-news-light-gray" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-news-border">
              <Skeleton className="h-40 w-full rounded-lg mb-3 bg-news-light-gray" />
              <Skeleton className="h-5 w-full mb-2 bg-news-light-gray" />
              <Skeleton className="h-4 w-full bg-news-light-gray" />
              <Skeleton className="h-4 w-2/3 mt-2 bg-news-light-gray" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="news-container flex-grow">
        {isLoading ? (
          renderLoading()
        ) : (
          <div className="py-6 animate-fade-in">
            {topHeadlines.length > 0 && (
              <HeroSection 
                mainArticle={topHeadlines[0]} 
                sideArticles={topHeadlines.slice(1, 4)} 
              />
            )}
            
            {popularNews.length > 0 && (
              <NewsList 
                title="Popular Stories" 
                articles={popularNews} 
              />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technologyNews.length > 0 && (
                <CategorySection 
                  title="Technology" 
                  articles={technologyNews}
                  category="technology"
                />
              )}
              
              {businessNews.length > 0 && (
                <CategorySection 
                  title="Business" 
                  articles={businessNews}
                  category="business"
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {healthNews.length > 0 && (
                <CategorySection 
                  title="Health" 
                  articles={healthNews}
                  category="health"
                />
              )}
              
              {sportsNews.length > 0 && (
                <CategorySection 
                  title="Sports" 
                  articles={sportsNews}
                  category="sports"
                />
              )}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
