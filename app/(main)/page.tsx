import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-[1100px]  flex flex-col pt-[100px]   items-center">
      <div className="flex w-full max-w-[1100px] px-[5px] sm:px-[20px]">
        <div className="flex flex-row ">
          <div className="w-[320px] flex items-center justify-center rounded-xl h-[60px] bg-pink-600 text-white font-semibold ">
            {" "}
            <p> Давайте помогать людям вместе!</p>
          </div>
          <div className="w-[600px] flex items-center justify-center rounded-xl h-[60px]  text-white font-semibold ">
            {" "}
            <p className="text-gray-700 text-[13px]">
              {" "}
              Организация РастимДобро занимается благотворительностью в веселой
              форме. Кому-то всегда нужна помощь, выделяя всего несколько часов
              в неделю можно уже многое изменить
            </p>
          </div>
          <img src="/mottihi.png" className="w-[300px]" />
        </div>
      </div>
    </div>
  );
}
