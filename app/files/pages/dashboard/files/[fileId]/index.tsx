import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getFile from "app/files/queries/getFile";
import deleteFile from "app/files/mutations/deleteFile";

export const File = () => {
  const router = useRouter();
  const fileId = useParam("fileId", "string");
  const [deleteFileMutation] = useMutation(deleteFile);
  const [file] = useQuery(getFile, { fileId });

  return (
    <>
      <Head>
        <title>{file.title}</title>
      </Head>

      <div>
        <h1>File {file.id}</h1>
        <pre>{JSON.stringify(file, null, 2)}</pre>

        <Link href={Routes.EditFilePage({ fileId: file.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteFileMutation({ fileId: file.id });
              router.push(Routes.FilesPage());
            }
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowFilePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.FilesPage()}>
          <a>Files</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <File />
      </Suspense>
    </div>
  );
};

ShowFilePage.authenticate = true;
ShowFilePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowFilePage;
