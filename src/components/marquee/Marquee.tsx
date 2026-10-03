import React from 'react';
import MarqueeText from 'react-marquee-text';

interface Headline {
    id: string
    title: string
}

const MarqueePage = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news");
    const data = await res.json();
    const headlines: Headline[] = data.data;
    // console.log(headlines)
    return (
        
        <div className='bg-red-600 text-white'>
            <div className="max-w-7xl mx-auto flex justify-center items-center ">
                <div className='px-4 py-2 bg-red-700'>সর্বশেষ</div>
            
            <MarqueeText className='py-2' direction='right' duration={15}>
            {headlines.map(headline => {
                return (
                    <div key={headline.id} className=''>
                            <span className='hover:border-b cursor-pointer font-bold'>{headline.title}</span>
                            <span className='px-4'>•</span>
                    </div>
                )
            })}
            </MarqueeText>
            </div>
        </div>
    );
};

export default MarqueePage;