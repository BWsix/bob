import { Suspense } from "react";
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import logout from "app/auth/mutations/logout";

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    );
  }
};

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
