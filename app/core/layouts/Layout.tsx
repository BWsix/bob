import { Header } from "app/core/components/Header";
import { BlitzLayout, Head } from "blitz";

interface Props {
  title?: string;
  subTitle?: string;
  noHeader?: boolean;
}

const Layout: BlitzLayout<Props> = ({ title, subTitle, noHeader, children }) => {
  return (
    <>
      <Head>
        <title>{title || `Bob - ${subTitle || "自主學習歷程檔案系統"}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!noHeader && <Header />}

      {children}
    </>
  );
};

export default Layout;
