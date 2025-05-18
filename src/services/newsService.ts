
import { toast } from "@/components/ui/sonner";

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const API_KEY = "b6013c6819c24e16ba5405ac3db2defd";
const BASE_URL = "https://newsapi.org/v2";

export const fetchNews = async (
  query: string = "Apple", 
  fromDate: string = "2025-05-12", 
  sortBy: string = "popularity",
  pageSize: number = 10,
  page: number = 1
): Promise<NewsResponse> => {
  try {
    // const url = `${BASE_URL}/everything?q=${query}&from=${fromDate}&sortBy=${sortBy}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
   let url = `https://ad8a-2400-1a00-b030-e870-5119-8290-24c-9839.ngrok-free.app/tesla-news`
    
    // if (category) {
    //   url += `&category=${category}`;
    // }
    
    const response = await fetch(url, {
       headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      })
    });

    if (!response.ok) {
      throw new Error(`Error fetching news: ${response.statusText}`);
    }

    const data = await response.json() as NewsResponse;
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    toast.error("Failed to load news articles");
    return { status: "error", totalResults: 0, articles: [] };
  }
};

export const fetchTopHeadlines = async (
  country: string = "us",
  category?: string,
  pageSize: number = 5,
  page: number = 1
): Promise<NewsResponse> => {
  try {
    // let url = `${BASE_URL}/top-headlines?country=${country}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
    let url = `https://ad8a-2400-1a00-b030-e870-5119-8290-24c-9839.ngrok-free.app/tesla-news`
    
    // if (category) {
    //   url += `&category=${category}`;
    // }
    
    const response = await fetch(url, {
       headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching headlines: ${response.statusText}`);
    }
    
    const data = await response.json() as NewsResponse;
    return data;
  } catch (error) {
    console.error("Error fetching headlines:", error);
    toast.error("Failed to load top headlines");
    return { status: "error", totalResults: 0, articles: [] };
  }
};

export const fetchNewsByCategory = async (
  category: string,
  pageSize: number = 10,
  page: number = 1
): Promise<NewsResponse> => {
  return fetchTopHeadlines("us", category, pageSize, page);
};
