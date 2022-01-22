import Container from "@mui/material/Container";
import { Breadcrumb } from "app/core/components/Breadcrumb";
import { Loader } from "app/core/components/gadgets/Loader";
import Layout from "app/core/layouts/Layout";
import { FileForm, FORM_ERROR } from "app/files/components/FileForm";
import updateFile from "app/files/mutations/updateFile";
import getFile from "app/files/queries/getFile";
import { BlitzPage, Head, useMutation, useParam, useQuery } from "blitz";
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

      <>
        <Breadcrumb
          meta={[
            { path: "/dashboard", name: "檔案列表" },
            { path: `/dashboard/${file.id}`, name: file.title },
            { name: "編輯" },
          ]}
        />

        <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
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
        </Container>
      </>
    </>
  );
};

const EditFilePage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <EditFile />
      </Suspense>
    </>
  );
};

EditFilePage.suppressFirstRenderFlicker = true;
EditFilePage.authenticate = true;
EditFilePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditFilePage;
