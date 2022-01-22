import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Layout from "app/core/layouts/Layout";
import { FileForm, FORM_ERROR } from "app/files/components/FileForm";
import createFile from "app/files/mutations/createFile";
import { BlitzPage, Link, Routes, useMutation } from "blitz";

const NewFilePage: BlitzPage = () => {
  const [createFileMutation] = useMutation(createFile);

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href={Routes.FilesPage()}>
            <MuiLink color="secondary" sx={{ cursor: "pointer" }}>
              檔案列表
            </MuiLink>
          </Link>
          <MuiLink color="secondary" sx={{ cursor: "pointer" }}>
            新增檔案
          </MuiLink>
        </Breadcrumbs>
      </Container>

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
