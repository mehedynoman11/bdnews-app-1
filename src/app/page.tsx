import MainSection from "@/components/MainSection/MainSection";
import MarqueePage from "@/components/marquee/Marquee";
import Image from "next/image";

interface MainSectionProp {
  id: string
  title: string
  description: string
  link: string
  imageUrl: string
  imageAlt: string
  category: string
  type: string
  isLive: boolean
  firstPublished: string
  lastPublished: string
  source: string
}


export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections');
  const data = await res.json();
  const section = data.data;
  const mainSection: MainSectionProp[] = section[0].articles;

  return (
    <div className="">
      <MarqueePage />
      <div className="grid grid-cols-3 max-w-7xl mx-auto">
        <div className="bg-red-600 p-10 col-span-2">
          <div className="grid grid-cols-2">
            <MainSection mainSection={mainSection[0]} />
            <div className="">
              {mainSection.slice(0,3).map(news => {
                return (
                  <div key={news.id}>
                    <div className="card bg-base-100 w-96 shadow-sm">
                      <div className="card-body">
                        <h2 className="card-title">{news.title}</h2>
                        <p>{news.description}</p>
                        <div className="card-actions justify-end">
                          <button className="btn btn-primary">Buy Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="bg-blue-400 p-10 col-span-1">

        </div>
      </div>
    </div>
  );
}
