import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Sparkle, ArrowRight } from "lucide-react";
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
      <div className="font-semibold flex flex-row justify-center">
        <div className=" flex items-center relative flex-col mr-[-100px] ml-[50px]">
          <p className="text-[20px]">
            <span className="bg-red-200">Растим добро </span> - некомерческая
            организация, направленная на обьединение людей, чтобы делать добрые
            дела вместе!
          </p>
          <p className="text-[16px] font-normal text-gray-800">
            Собираемся по определенным дням, чтобы убирать мусор. Приносите свою
            ненужную одежду и другие вещи, есть много людей, кому они нужны.
          </p>
          <p className="text-[16px] font-normal text-gray-800">
            Выделите всего один час в неделю и измените мир вокруг себя!
          </p>
          <div className="bg-orange-300 shadow-md w-[250px] h-[50px] mt-[30px]  hover:mt-[20px] transition-all duration-300 cursor-pointer rounded-xl flex items-center justify-center">
            Записаться
          </div>

          <img
            src="/volon.jpg"
            className="w-[120px] rotate-12 top-0 right-0 mt-[-20px] mr-[-50px] rounded-[20px] absolute"
          />
          <img
            src="/vol1.jpg"
            className="w-[100px] -rotate-15 bottom-0 left-0 mb-[110px] ml-[-50px] rounded-[20px] absolute"
          />
          <img
            src="/vol2.jpg"
            className="w-[100px] rotate-20 top-0 right-0 mt-[90px] mr-[-80px] rounded-[20px] absolute"
          />
        </div>
        <img src="/cat1.png" className="w-[700px] mr-[-150px]" />
      </div>

      <div className="w-full flex text-pink-900 justify-between flex-row items-center ">
        <div className="flex flex-row items-center ">
          <img src="/strawberry.png" className="w-[60px] -rotate-20" />

          <div className="font-semibold flex flex-row bg-gradient-to-r from-red-100 to-red-300 w-[200px] items-center h-[30px] pt-[2px] text-pink-950 rounded-full ml-[-30px] pl-[30px]">
            <p>Наши проекты </p>
            <Sparkle className="    ml-[10px] w-[13px] h-[13px]" />
          </div>
        </div>
        <Link
          href="/events"
          className="items-center hover:underline flex flex-row mr-[10px]"
        >
          <p className="font-semibold">Ко всем проектам</p>
          <ArrowRight className="w-[15px] h-[15px] ml-[5px]" />
        </Link>
      </div>
      <p className="text-[16px] font-normal text-pink-800 w-[90%]">
        Здесь список событий, где вы прямо сейчас могли бы поучаствовать. Чтобы
        узнать подробнее и записаться кликните на понравившееся мероприятие.
      </p>
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="flex flex-row items-center ">
          <img src="/strawberry.png" className="w-[60px] -rotate-20" />

          <div className="font-semibold flex flex-row bg-gradient-to-r from-red-100 to-red-300 w-[330px] items-center h-[30px] pt-[2px] text-pink-950 rounded-full ml-[-30px] pl-[30px]">
            <p>Статьи о благотворительности </p>
            <Sparkle className="    ml-[10px] w-[13px] h-[13px]" />
          </div>
        </div>
        <Link
          href="/articles"
          className="items-center hover:underline text-pink-900 flex flex-row mr-[10px]"
        >
          <p className="font-semibold">Ко всем статьям</p>
          <ArrowRight className="w-[15px] h-[15px] ml-[5px]" />
        </Link>
      </div>
      <p className="text-[16px] font-normal text-pink-800 w-[90%] mb-[20px]">
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
                      {formatDate(article.created_at)}
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
