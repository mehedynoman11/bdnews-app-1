import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  slug: string
  title: string
  topicId: string | null
  url: string
  scrapable: boolean
}

const NavLinkPage = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories");
    const data = await res.json();
    const navLink:NavLinkProps[] = data.data
    const navFilter = navLink.filter(nav => nav.scrapable)
    return (
        <div className='flex gap-5'>
            <Link href={'/'}>হোম</Link>
            {navFilter.map((nav, ind) => {
                return(
                    <Link key={ind} href={`/category/${nav.slug}`}>{nav.title}</Link>
                )
            })}
        </div>
    );
};

export default NavLinkPage;