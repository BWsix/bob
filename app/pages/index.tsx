// https://github.com/hellosoftware-io/next-landing-page-simple

import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Layout from "app/core/layouts/Layout";
import { BlitzPage, Link, Routes } from "blitz";

const FeatureBlock = ({ title, content }: { title: string; content: string }) => {
  return (
    <Grid item sm={12} md={4} sx={{ mb: 4 }}>
      <Typography variant="h3" marginY={2}>
        <DoneOutlineOutlinedIcon fontSize="large" /> {title}
      </Typography>
      <Typography variant="subtitle1">{content}</Typography>
    </Grid>
  );
};

const Home: BlitzPage = () => {
  return (
    <>
      <Container maxWidth="md">
        <Grid container alignItems="center" sx={{ py: 12 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h1">Bob</Typography>
            <Typography variant="h6">自主學習檔案系統</Typography>

            <Link href={Routes.LoginPage()}>
              <Button variant="contained" disableElevation sx={{ mr: 2, mt: 2 }}>
                登入Bob
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md" sx={{ pb: { xs: 8, md: 12 } }}>
        <Grid container alignItems="center" sx={{ py: 12 }}>
          <Grid container spacing={4}>
            <FeatureBlock
              title="值得信賴"
              content="Bob用心保管確保您的檔案，確保不會有無故遭刪除的風險"
            />
            <FeatureBlock
              title="盡情發揮"
              content="Bob將敘述的100字上限提升到420字，讓文思泉湧的您也能盡情發揮"
            />
            <FeatureBlock title="減少失誤" content="Bob支援檔案預覽，讓您不怕選錯附加檔案" />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h2" textAlign="center">
          加入Bob
        </Typography>
        <br />
        <Typography variant="h5" textAlign="center">
          更美好的自主學習體驗，就從從今天開始
        </Typography>
      </Container>
    </>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.redirectAuthenticatedTo = Routes.FilesPage();
Home.getLayout = (page) => (
  <Layout title="Home" noHeader>
    {page}
  </Layout>
);

export default Home;
