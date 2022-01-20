import { useRouter, BlitzPage } from "blitz";
import Layout from "app/core/layouts/Layout";

const LoginPage: BlitzPage = () => {
  return (
    <div>
      <a href="/api/auth/github">Log In With GITHUB</a>
    </div>
  );
};

LoginPage.redirectAuthenticatedTo = "/";
LoginPage.getLayout = (page) => <Layout title="登入">{page}</Layout>;

export default LoginPage;
