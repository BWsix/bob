import Container from "@mui/material/Container";
import { Breadcrumb } from "app/core/components/Breadcrumb";
import Layout from "app/core/layouts/Layout";
import { FileForm, FORM_ERROR } from "app/files/components/FileForm";
import createFile from "app/files/mutations/createFile";
import { BlitzPage, useMutation } from "blitz";

const NewFilePage: BlitzPage = () => {
  const [createFileMutation] = useMutation(createFile);

  return (
    <>
      <Breadcrumb
        meta={[
          { path: "/dashboard", name: "檔案列表" },
          { path: "", name: "新增檔案" },
        ]}
      />

      <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
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
      </Container>
    </>
  );
};

NewFilePage.suppressFirstRenderFlicker = true;
NewFilePage.authenticate = true;
NewFilePage.getLayout = (page) => <Layout subTitle="新增檔案">{page}</Layout>;

export default NewFilePage;
