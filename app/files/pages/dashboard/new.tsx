import Layout from "app/core/layouts/Layout";
import { FileForm, FORM_ERROR } from "app/files/components/FileForm";
import createFile from "app/files/mutations/createFile";
import { BlitzPage, Link, Routes, useMutation, useRouter } from "blitz";

const NewFilePage: BlitzPage = () => {
  const [createFileMutation] = useMutation(createFile);

  return (
    <div>
      <h1>新增檔案</h1>

      <FileForm
        submitText="新增檔案"
        onSubmit={async (values) => {
          try {
            const file = await createFileMutation(values);

            return { fileId: file.id };
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.FilesPage()}>
          <a>檔案列表</a>
        </Link>
      </p>
    </div>
  );
};

NewFilePage.suppressFirstRenderFlicker = true;
NewFilePage.authenticate = true;
NewFilePage.getLayout = (page) => <Layout subTitle="新增檔案">{page}</Layout>;

export default NewFilePage;
