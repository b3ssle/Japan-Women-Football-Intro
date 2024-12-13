import React from "react";
import { TreePine, ExternalLink } from "lucide-react";

const AboutPage = () => {
  const links = [
    {
      title: "GitHub",
      url: "https://github.com/b3ssle/Japan-Women-Football-Intro",
      description: "プロジェクトのソースコードとコントリビューション",
    },
    {
      title: "Linktree",
      url: "https://linktr.ee/b3ssle",
      description: "私についてもっと詳しく",
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-12">
        {/* Project Introduction */}
        <section>
          <h1 className="text-4xl font-bold mb-6">このプロジェクトについて</h1>
          <div className="prose prose-pink max-w-none">
            <p className="text-lg text-gray-600 mb-4">
              Japan Women's Football
              Intro（日本女子サッカー紹介）は日本の女子サッカーをより多くの人に知ってもらいたいという思いから生まれたプロジェクトです。
            </p>
            <p className="text-lg text-gray-600 mb-4">
              現在進行中のサブプロジェクトとして、日本女子サッカーマップを制作しており、WEリーグ、皇后杯、全日本大学女子サッカー選手権大会、全日本高等学校女子サッカー選手権大会の試合情報を、見やすく、使いやすい形で提供することを目指しています。
            </p>
            <p className="text-lg text-gray-600">
              選手たちの活躍とともに、女子サッカーの魅力を多くの人に伝えられるプラットフォームになることを願っています。このプロジェクトを通じて、日本の女子サッカーの発展に少しでも貢献できれば幸いです。
            </p>
          </div>
        </section>

        {/* Project Features */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            日本女子サッカーマップ主な機能
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">全国の試合を一目で</h3>
              <p className="text-gray-600">
                日本全国で行われる女子サッカーの試合をマップ上で確認できます。開催地や会場情報を視覚的に把握することができます。
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">詳細な試合情報</h3>
              <p className="text-gray-600">
                各試合の詳細情報（日時、会場、対戦カード）を分かりやすく表示。公式サイトへのリンクも用意しています。
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">チーム紹介</h3>
              <p className="text-gray-600">
                参加チームの詳細情報を掲載。チームの歴史や特徴を知ることができます。
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">オープンソース</h3>
              <p className="text-gray-600">
                プロジェクトはGitHubで公開しており、誰でも開発に参加できます。女子サッカーの発展のため、共に作り上げていきましょう。
              </p>
            </div>
          </div>
        </section>

        {/* Creator Introduction */}
        <section>
          <h2 className="text-2xl font-bold mb-6">製作者について</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div>
              <h3 className="text-xl font-bold mb-4">b3ssle</h3>
              <p className="text-gray-600 mb-6">
                台湾出身、大学時代にサッカーと出会い、その魅力に取りつかれました。2022 年に来日して以来、特に女子サッカーの発展に貢献したいと考え、このプロジェクトを立ち上げました。プログラミングとサッカーという2つの情熱を組み合わせ、より多くの人に女子サッカーの魅力を伝えられるように努めています。
              </p>

              {/* Link Tree */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-nadeshiko mb-4">
                  <TreePine className="w-5 h-5" />
                  <h4 className="font-bold">Links</h4>
                </div>
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border hover:border-nadeshiko hover:shadow-sm transition-all block"
                  >
                    <div>
                      <div className="font-medium">{link.title}</div>
                      <div className="text-sm text-gray-500">
                        {link.description}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-gray-600">
            本プロジェクトは GPL-3.0
            ライセンスのもと、オープンソースとして開発を行っています。コードの改善、新機能の提案、ドキュメントの修正など、プロジェクトへの貢献を大歓迎です。ご意見、ご要望、バグ報告などございましたら、
            <a
              href="https://github.com/b3ssle/Japan-Women-Football-Intro/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nadeshiko hover:text-nadeshiko-light underline"
            >
              GitHub
            </a>{" "}
            の Issue、
            <a
              href="https://www.instagram.com/b3ss.fc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nadeshiko hover:text-nadeshiko-light underline"
            >
              Instagram
            </a>{" "}
            の DM または
            <a
              href="mailto:hi@b3ssle.be"
              className="text-nadeshiko hover:text-nadeshiko-light underline"
            >
              メール
            </a>
            にてお気軽にご連絡ください。
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
