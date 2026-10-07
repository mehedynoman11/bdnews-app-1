import React from 'react';

interface IMostReadNews {
    id: string
    title: string
}

const MostRead = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read')
    const data = await res.json();
    const mostRead:IMostReadNews[] = data.data; 
    return (
        <div className='card p-2 bg-base-100 border-gray-300 border'>
            <h1 className='font-bold text-red-700 mb-5'>সর্বাধিক পঠিত</h1>
            <div className="grid gap-3">
                {mostRead.map((n, i)=> <div key={n.id}>
                    <div className="flex gap-2 text-gray-600"><p className='font-bold'>{i+1}</p> <h2 className='font-bold '>{n.title}</h2></div>
                </div>)}
            </div>
        </div>
    );
};

export default MostRead;