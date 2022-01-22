import Layout from "app/core/layouts/Layout";
import { FileForm, FORM_ERROR } from "app/files/components/FileForm";
import updateFile from "app/files/mutations/updateFile";
import getFile from "app/files/queries/getFile";
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from "blitz";
import { Suspense } from "react";

export const EditFile = () => {
  const fileId = useParam("fileId", "string");
  const [file] = useQuery(
    getFile,
    { fileId },
    {
      staleTime: Infinity,
    }
  );
  const [updateFileMutation] = useMutation(updateFile);

  return (
    <>
      <Head>
        <title>正在編輯檔案 - {file.title}</title>
      </Head>

      <div>
        <h1>正在編輯檔案 - {file.title}</h1>
        <pre>{JSON.stringify(file, null, 2)}</pre>

        <FileForm
          submitText="儲存變更"
          initialValues={{ ...file, attachmentFileName: file.attachment[0]?.attachmentTitle }}
          onSubmit={async (values) => {
            try {
              await updateFileMutation({
                ...values,
                fileId: file.id,
              });

              return { fileId: file.id };
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditFilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFile />
      </Suspense>

      <p>
        <Link href={Routes.FilesPage()}>
          <a>Files</a>
        </Link>
      </p>
    </div>
  );
};

EditFilePage.suppressFirstRenderFlicker = true;
EditFilePage.authenticate = true;
EditFilePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditFilePage;
