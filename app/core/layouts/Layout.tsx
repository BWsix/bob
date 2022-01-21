import { BlitzLayout, Head } from "blitz";

const Layout: BlitzLayout<{ title?: string; subTitle?: string }> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || `Bob - ${subTitle || "自主學習歷程檔案系統"}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};

export default Layout;
