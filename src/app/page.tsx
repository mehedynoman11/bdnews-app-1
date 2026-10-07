import MainSection from "@/components/MainSection/MainSection";
import MarqueePage from "@/components/marquee/Marquee";
import MostRead from "@/components/MostRead";
import NewsCardPage from "@/components/NewsCard";

interface IOtherSection {
  id: string
  title: string
  curationId: string
  articles: {
    id: string
    title: string
    description: string
    link: string
    imageUrl: string
    imageAlt: string
    category: string
  }[];
}

// interface MainSectionProp {
//   id: string
//   title: string
//   description: string
//   link: string
//   imageUrl: string
//   imageAlt: string
//   category: string
//   type: string
//   isLive: boolean
//   firstPublished: string
//   lastPublished: string
//   source: string
// }


export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections');
  const data = await res.json();
  const section = data.data;
  const mainSection = section[0].articles;
  const otherSection:IOtherSection[] = section.slice(1);
  // console.log(otherSection)

  return (
    <div className="">
      
      <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
        <div className="p-10 col-span-2">
          <MainSection mainSection={mainSection} />
          <div className="grid gap-4 mt-5">
            {otherSection.map(os => {
              return (
                <div key={os.curationId} className="">
                  <h1 className="text-lg font-bold border-b-2 border-red-700 pb-2">{os.title}</h1>
                  <div className="grid grid-cols-3 gap-5 mt-4">
                    {
                      os.articles.map(news => <NewsCardPage key={news.id} news={news} />)
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {/* MOST Read Section  */}
        <div className=" p-10 col-span-1 ">
            <MostRead />
        </div>
      </div>
    </div>
  );
}
