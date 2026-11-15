
export default function Page() {
  return <main>
    <h1 className="page-title">活動実績</h1>
    <h2 className="year">2025年度実績</h2>

    <section aria-labelledby="competition-title">
      <h3 id="competition-title" className="category-title">大会</h3>
      <div className="achievement-grid">
        <article className="achievement-card">
          <h4>高校生ビジネスプラングランプリ</h4>
          <p className="desc">高校生向け国内最大規模のビジネスコンテストの都大会、高校生ビジネスプラン・グランプリ in TOKYOにて東京都知事賞（最優秀賞）を受賞しました。また、全国大会ではファイナリストにも選ばれました。</p>
          <div className="card-links">
            <a href="https://www.waseda.jp/school/shs/news/2026/01/29/10341/" target="_blank" rel="noopener noreferrer" className="btn">早稲田高等学院ニュース</a>
            <a href="https://www.jfc.go.jp/n/grandprix/" target="_blank" rel="noopener noreferrer" className="btn">日本政策金融公庫 公式サイト</a>
          </div>
        </article>
        <article className="achievement-card">
          <h4>International Trade Challenge（ITC）2025</h4>
          <p className="desc">国内大会で優勝し、シンガポールで開催された世界大会に日本代表として出場しました。</p>
          <div className="card-links">
            <a href="https://ja-japan.org/contests/ITC.html" target="_blank" rel="noopener noreferrer" className="btn">JA Japan ITC ページ</a>
          </div>
        </article>
        <article className="achievement-card">
          <h4>第十二回マイナビキャリア甲子園 2025</h4>
          <p className="desc">全国3,151チームが参加する中、本プロジェクトから3チームが出場。うち1チームが書類審査を通過（上位240チーム）、2チームが準決勝に進出（上位72チーム）しました。</p>
          <div className="card-links">
            <a href="https://careerkoshien.mynavi.jp/" target="_blank" rel="noopener noreferrer" className="btn">マイナビキャリア甲子園</a>
          </div>
        </article>
        <article className="achievement-card">
          <h4>エコノミクス甲子園</h4>
          <p className="desc">経済・金融の知識を問うエコノミクス甲子園の東京都大会で受賞しました。</p>
        </article>
        <article className="achievement-card">
          <h4>早稲田附属校系属校ビジネス・コンテスト</h4>
          <p className="desc">優秀賞を受賞しました。</p>
          <div className="card-links">
            <a href="https://www.waseda.jp/inst/entrepreneur/news/2025/06/20/7268/" target="_blank" rel="noopener noreferrer" className="btn">早稲田大学アントレプレナーシップセンター</a>
          </div>
        </article>
      </div>
    </section>

    <section aria-labelledby="other-activities-title">
      <h3 id="other-activities-title" className="category-title">その他活動報告</h3>
      <div className="achievement-grid">
        <article className="achievement-card">
          <h4>金融教育プロジェクト</h4>
          <p className="desc">早稲田大学産業経営研究所（システム競争研究所）とみずほ証券による委託研究プロジェクトに本プロジェクトのメンバーが参加し、早稲田大学にて研究発表を行いました。</p>
          <div className="card-links">
            <a href="https://www.waseda.jp/fedu/iase/news/2025/03/28/2255/" target="_blank" rel="noopener noreferrer" className="btn">早稲田大学教育学部ニュース</a>
          </div>
        </article>
        <article className="achievement-card">
          <h4>東京証券取引所訪問</h4>
          <p className="desc">金融教育プロジェクトの一環として東京証券取引所を見学し、学院OBから直接お話を伺いました。</p>
        </article>
        <article className="achievement-card">
          <h4>TORYUMON</h4>
          <p className="desc">本プロジェクトのOBが運営す学生向けスタートアップイベント「TORYUMON」に参加しました。</p>
        </article>
      </div>
    </section>
  </main>;
}
