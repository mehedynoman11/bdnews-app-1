import NewsCardPage from '@/components/NewsCard';
import React from 'react';

interface CategoryPageDetailsProps {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const CategoryPageDetails = async ({params}:{params:Promise<{categoryId:string}>}) => {
    const {categoryId} = await params;
    
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`)
    const data = await res.json();
    const category:CategoryPageDetailsProps[] = data.data;

    console.log(category)

    return (
        <div className='container mx-auto max-w-7xl'>
          <h1 className='text-2xl font-bold text-red-700 border-b-2 border-b-gray-600 py-4'>{data.title}</h1>
          <div className="grid grid-cols-3 mt-4 gap-4">
            {category.map((news) => (
            <NewsCardPage key={news.id} news={news} />
          ))}
          </div>
        </div>
    );
};

export default CategoryPageDetails;