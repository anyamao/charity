import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Sparkle, ArrowRight, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
interface Article {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  reading_time: string;
  content: string;
}

export default async function HomePage() {
  let articles: Article[] = [];
  try {
    articles = await apiFetch<Article[]>("/api/v1/articles/");
  } catch (err) {
    console.error("Failed to load articles:", err);
  }

  return (
    <main className="h-full w-full flex items-center  flex-col p-8">
      <div className="w-full flex flex-row justify-between items-center ">
        <Link
          href="/"
          className="items-center hover:underline text-pink-900 flex flex-row mr-[10px]"
        >
          <ArrowLeft className="w-[15px] h-[15px] mr-[5px]" />
          <p className="font-semibold">На главную</p>
        </Link>

        <div className="flex flex-row items-center ">
          <img src="/strawberry.png" className="w-[60px] -rotate-20" />

          <div className="font-semibold flex flex-row bg-gradient-to-r from-red-100 to-red-300 w-[330px] items-center h-[30px] pt-[2px] text-pink-950 rounded-full ml-[-30px] pl-[30px]">
            <p>Статьи о благотворительности </p>
            <Sparkle className="    ml-[10px] w-[13px] h-[13px]" />
          </div>
        </div>
      </div>
      <p className="text-[16px] font-normal text-pink-800 w-[90%] mt-[10px] mb-[30px]">
        Здесь список статей, в которых я делаю обзоры на уже прошедшие
        благотворительные мероприятия, можете почитать, как это было и обсудить
        мероприятие в комментариях.
      </p>
      <div className="max-w-6xl mx-auto">
        {articles.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block bg-white rounded-[30px] shadow-md overflow-hidden hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative h-48 m-[10px] rounded-[25px] overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex flex-row justify-between">
                    <span className="inline-block px-3 py-1 bg-pink-100 text-pink-900 text-xs font-medium rounded-full">
                      {article.reading_time}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                     
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-[10px] mx-[10px] text-gray-900 mt-3 group-hover:text-pink-900 transition-colors">
                    {article.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
