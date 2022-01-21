import Layout from "app/core/layouts/Layout";
import getFiles from "app/files/queries/getFiles";
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from "blitz";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 3;

export const FilesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ files, hasMore }] = usePaginatedQuery(getFiles, {
    orderBy: { createdAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <Link href={Routes.ShowFilePage({ fileId: file.id })}>
              <a>{file.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const FilesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Files</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewFilePage()}>
            <a>Create File</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <FilesList />
        </Suspense>
      </div>
    </>
  );
};

FilesPage.suppressFirstRenderFlicker = true;
FilesPage.authenticate = true;
FilesPage.getLayout = (page) => <Layout>{page}</Layout>;

export default FilesPage;
