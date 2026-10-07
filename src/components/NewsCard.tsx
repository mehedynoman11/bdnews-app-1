import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface News {
    id: string
    title: string
    description: string
    category: string
    imageUrl: string
    imageAlt: string
}

const NewsCardPage = ({ news }: { news: News }) => {
    return (
        <Link href={`/news/${news.id}`}>
            <div className="card bg-base-100 w-full shrink-0 shadow-sm self-start">
                <figure className="relative aspect-auto w-full">
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt}
                        width={600}
                        height={450}
                        className="w-full h-auto"
                        priority
                    />
                </figure>
                <div className="card-body t ">
                    <h2 className="card-title">{news.title}</h2>
                    <p className='text-sm text-base-content/70 leading-snug line-clamp-2'>{news.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default NewsCardPage;