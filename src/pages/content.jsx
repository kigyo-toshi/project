import { Accordion } from '../components/Accordion.jsx';

export default function Page() {
  return <main>
    <h1>活動内容</h1>
    <Accordion items={[{ title: <>
          1　ビジネスプラン構築を通じたスタートアップスキル習得
        </>, content: <>
          ビジネスプランの作成を通じて、起業に必要なスキルを身につけます。
        </> },
{ title: <>
          2　企業訪問
        </>, content: <>
          OBの協力を得て、企業訪問を実施します。
        </> },
{ title: <>
          3　学院生に向けたイベントの開催
        </>, content: <>
          学院生向けのイベントを企画・運営します。
        </> },
{ title: <>
          4　コンテスト・大会への出場
        </>, content: <>
          世界中の同世代の高校生と競い合います。また、専門家によるフィードバックを得ることで、自身のビジネスプランを定期的に客観視できます。
        </> }]} /></main>;
}
