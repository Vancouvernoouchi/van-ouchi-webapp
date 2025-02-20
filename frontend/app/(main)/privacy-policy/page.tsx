const PrivacyPolicyPage = () => {
  return (
    <main className="base-px md:px-20 lg:px-60 py-4 lg:py-10 tracking-wider leading-relaxed text-sm lg:text-base">
      <h1 className="text-xl md:2xl lg:text-3xl font-bold pb-4 lg:pb-8 ">
        プライバシーポリシー
      </h1>

      <section className="flex flex-col gap-8">
        <p>
          BLOOM CONSULTING
          Inc.（以下「当社」といいます。）は、シェアハウス紹介サービス「バンクーバーのお家」（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
        </p>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            1. 個人情報の定義
          </h3>
          <p className="">
            本ポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義される個人情報を意味します。
          </p>
        </article>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            2. 個人情報の取得方法
          </h3>
          <p>当社は、以下の方法により個人情報を取得します：</p>
          <ul className="pl-5 list-disc">
            <li>本サービスの利用登録時</li>
            <li>お問い合わせフォームからの送信時</li>
            <li>メールでのやり取り</li>
            <li>電話でのやり取り</li>
            <li>契約書類の記入時</li>
          </ul>
        </article>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            3. 利用目的
          </h3>
          <p>当社は、取得した個人情報を以下の目的で利用します：</p>
          <ul className="pl-5 list-disc">
            <li>本サービスの提供・運営のため</li>
            <li>ユーザーからのお問い合わせに対応するため</li>
            <li>物件オーナーとの連絡・調整のため</li>
            <li>利用料金の請求のため</li>
            <li>当社サービスに関する案内をお送りするため</li>
            <li>本サービスの改善・新サービス開発のため</li>
          </ul>
        </article>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            4. 個人情報の第三者提供
          </h3>
          <p>
            当社は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供いたしません：
          </p>
          <ul className="pl-5 list-disc">
            <li>法令に基づく場合</li>
            <li>人の生命、身体または財産の保護のために必要がある場合</li>
            <li>
              公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合
            </li>
            <li>
              国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
            </li>
          </ul>
        </article>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            5. 個人情報の安全管理
          </h3>
          <p>
            当社は、個人情報の紛失、破壊、改ざん及び漏洩などのリスクに対して、適切な安全管理措置を講じます。
          </p>
        </article>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            6. 個人情報の開示・訂正・利用停止
          </h3>
          <p>
            ユーザーは、当社に対して個人情報の開示・訂正・利用停止を請求することができます。請求を行う場合は、本ポリシー末尾の連絡先までご連絡ください。
          </p>
        </article>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            7. Cookie（クッキー）の使用
          </h3>
          <p>
            当社は、本サービスにおいてCookieを使用する場合があります。Cookieは、ユーザーの利便性向上、サービスの改善・開発のために使用され、個人を特定する情報は含まれません。
          </p>
        </article>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            8. プライバシーポリシーの変更
          </h3>
          <p>
            当社は、必要に応じて、本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
          </p>
        </article>
        <article>
          <h3 className="text-base lg:text-lg font-semibold pb-2">
            9. お問い合わせ先
          </h3>
          <p>
            本ポリシーに関するお問い合わせは、下記の連絡先までお願いいたします。
          </p>
          <div className="py-4">
            <p>会社名：BLOOM CONSULTING Inc.</p>
            <p>住所：#170 422 Richards St, Vancouver, BC V6B 2Z4</p>
            <p>代表者：Yuki Sugimoto</p>
            <p>メール：vancouver.no.ouchi@gmail.com</p>
          </div>
        </article>
        <p className="text-right">制定日：2024年12月20日</p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
