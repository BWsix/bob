import GitHub from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Layout from "app/core/layouts/Layout";
import { BlitzPage, Routes } from "blitz";

const LoginPage: BlitzPage = () => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" align="center">
            <b>Log in to Bob</b>
          </Typography>

          <Grid
            container
            marginTop={4}
            paddingX={5}
            spacing={0.8}
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item>
              <Button
                href="/api/auth/github"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<GitHub />}
              >
                Continue with GitHub
              </Button>
            </Grid>
            <Grid item>
              <Button
                href="/api/auth/google"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<Google />}
              >
                Continue with Google
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

LoginPage.suppressFirstRenderFlicker = true;
LoginPage.getLayout = (page) => (
  <Layout subTitle="登入" noHeader>
    {page}
  </Layout>
);
LoginPage.redirectAuthenticatedTo = Routes.FilesPage();

export default LoginPage;
