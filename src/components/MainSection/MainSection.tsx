import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MainNews {
    id: string
    title: string
    description: string
    category: string
    imageUrl: string
    imageAlt: string
}
const MainSection = ({ mainSection }:{mainSection: MainNews[]}) => {
    const [firstNews, ...otherNews] = mainSection;
    return (

        <div className="flex flex-col md:flex-row gap-4">
            {/* Featured news */}
             <Link href={`/news/${firstNews.id}`}>
             <div className="card bg-base-100 w-full lg:w-96 shrink-0 shadow-sm self-start">
                <figure className="relative aspect-auto w-full">
                    <Image
                        src={firstNews.imageUrl}
                        alt={firstNews.title}
                        width={600}
                        height={450}
                        className="w-full h-auto"
                        priority
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstNews.title}</h2>
                    <p className='text-sm text-base-content/70 leading-snug'>{firstNews.description}</p>
                </div>
            </div>
             </Link>
            

            {/* Other news: 2 columns x 2 rows */}
            <div className="grid gap-4">
                {otherNews.slice(0, 4).map((on) => (
                    <div
                        key={on.id}
                        className="card bg-base-100 p-4 border border-gray-300"
                    >
                        <h2 className="text-lg font-bold">{on.title}</h2>
                        <p className='text-sm text-base-content/70 leading-snug line-clamp-2'>{on.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MainSection;