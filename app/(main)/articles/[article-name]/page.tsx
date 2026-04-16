import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
interface Article {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  reading_time: string;
  content: string;
}

// ✅ Make the component async and await params
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ "article-name": string }>;
}) {
  // ✅ Await the params
  const resolvedParams = await params;
  const slug = resolvedParams["article-name"];

  let article: Article;
  try {
    article = await apiFetch<Article>(`/api/v1/articles/${slug}`);
  } catch (err) {
    console.error("Failed to fetch article:", err);
    notFound();
  }

  return (
    <main className="h-full w-full p-8">
      <div className=" mx-auto">
        <Link
          href="/articles"
          className="inline-flex items-center text-pink-900 font-semibold underline mb-6"
        >
          <ArrowLeft className="w-[15px] h-[15px] mr-[5px]" />{" "}
          <p>Ко всем статьям</p>
        </Link>

        <article className="bg-white rounded-[30px] shadow-xs overflow-hidden">
          <div className="relative h-[300px] m-[10px]  ">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full rounded-[20px] h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8 mt-[-20px]">
            <div className="flex items-center w-full justify-between gap-3 mb-4">
              <span className="px-3 py-1 bg-pink-100 text-pink-900 text-sm font-medium rounded-full">
                {article.reading_time}
              </span>
              <div className=" font-semibold">Дом Семьи</div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>
<div 
  className="text-gray-700 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: article.content }}
/>
          </div>
        </article>
      </div>
    </main>
  );
}
