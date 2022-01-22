import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { Loader } from "app/core/components/gadgets/Loader";
import Layout from "app/core/layouts/Layout";
import { File } from "app/files/components/File";
import getFiles from "app/files/queries/getFiles";
import { BlitzPage, Link, Routes, usePaginatedQuery, useRouter } from "blitz";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 15;

export const FilesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;

  const [{ files, count }] = usePaginatedQuery(getFiles, {
    orderBy: { createdAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const handlePagination = (_, value: number) => {
    router.push({ query: { page: value - 1 } });
  };

  return (
    <>
      <Grid container direction="row" justifyContent="space-around" alignItems="center" marginY={3}>
        <Grid item>
          <Pagination
            count={Math.floor(count / ITEMS_PER_PAGE) + 1}
            onChange={handlePagination}
            size="large"
          />
        </Grid>
        <Grid item>
          <Link href={Routes.NewFilePage()}>
            <Button variant="contained">新增檔案</Button>
          </Link>
        </Grid>
      </Grid>

      {files.map((file, idx) => (
        <>
          <File key={file.id} file={file} />
          {idx < files.length - 1 && <Divider light />}
        </>
      ))}

      <Grid container justifyContent="space-around" marginTop={3}>
        <Pagination
          count={Math.floor(count / ITEMS_PER_PAGE) + 1}
          onChange={handlePagination}
          size="large"
        />
      </Grid>
    </>
  );
};

const FilesPage: BlitzPage = () => {
  return (
    <>
      <Container maxWidth="md">
        <Suspense fallback={<Loader />}>
          <FilesList />
        </Suspense>
      </Container>
    </>
  );
};

FilesPage.suppressFirstRenderFlicker = true;
FilesPage.authenticate = { redirectTo: Routes.LoginPage() };
FilesPage.getLayout = (page) => <Layout subTitle="檔案列表">{page}</Layout>;

export default FilesPage;
