import GitHub from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "blitz";

const useStyles = makeStyles({
  githubButton: {
    backgroundColor: "#24292e",
    textTransform: "none",
  },
});

const LoginPage: BlitzPage = () => {
  const classes = useStyles();

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
                className={classes.githubButton}
                startIcon={<GitHub />}
              >
                Continue with GitHub
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

LoginPage.suppressFirstRenderFlicker = true;
LoginPage.getLayout = (page) => <Layout subTitle="登入">{page}</Layout>;
LoginPage.redirectAuthenticatedTo = "/dashboard";

export default LoginPage;
