import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Breadcrumb } from "app/core/components/Breadcrumb";
import { Loader } from "app/core/components/gadgets/Loader";
import Layout from "app/core/layouts/Layout";
import { AttachmentViewer } from "app/files/components/AttachmentViewer";
import { useAttachment } from "app/files/hooks/useAttachment";
import deleteFile from "app/files/mutations/deleteFile";
import getFile from "app/files/queries/getFile";
import { BlitzPage, Link, Routes, useMutation, useParam, useQuery, useRouter } from "blitz";
import { Suspense } from "react";

const File = ({ fileId }: { fileId: string }) => {
  const router = useRouter();

  const [file] = useQuery(getFile, { fileId });
  const [deleteFileMutation] = useMutation(deleteFile);

  const [attachmentFile, loading, error] = useAttachment(file.attachment[0]?.id);

  return (
    <>
      <Breadcrumb meta={[{ path: "/dashboard", name: "檔案列表" }, { name: file.title }]} />

      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h2" marginTop={4} marginBottom={1}>
          {file.title}
        </Typography>

        {file.externalUrl && (
          <Typography color="secondary">
            <Chip
              clickable
              variant="outlined"
              component="a"
              label={file.externalUrl}
              href={file.externalUrl}
              target="_blank"
              deleteIcon={<OpenInNewIcon />}
              onDelete={() => {}}
            />
          </Typography>
        )}

        {file.description && (
          <Typography
            marginTop={8}
            marginBottom={2}
            style={{ display: "inline-block", whiteSpace: "pre-line" }}
          >
            {file.description}
          </Typography>
        )}

        {Boolean(file.attachment.length) && loading ? (
          <Typography textAlign="center">
            <CircularProgress />
          </Typography>
        ) : (
          error || (attachmentFile && <AttachmentViewer file={attachmentFile} />)
        )}

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href={Routes.EditFilePage({ fileId: file.id })}>
              <Button variant="text" color="secondary">
                編輯
              </Button>
            </Link>
            <Button
              variant="text"
              color="secondary"
              onClick={async () => {
                if (window.confirm("將會刪除檔案 - " + file.title)) {
                  await deleteFileMutation({ fileId: file.id });
                  router.push(Routes.FilesPage());
                }
              }}
            >
              刪除
            </Button>
          </Grid>
          <Grid item md={12}>
            <Button disabled variant="text" color="secondary" fullWidth>
              <Typography>最後更新於 {file.updatedAt.toLocaleString()}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const ShowFilePage: BlitzPage = () => {
  const fileId = useParam("fileId", "string");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <File fileId={fileId!} />
      </Suspense>
    </>
  );
};

ShowFilePage.authenticate = { redirectTo: Routes.Home() };
ShowFilePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowFilePage;
