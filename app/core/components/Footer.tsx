import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link } from "blitz";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <MuiLink color="inherit" href="https://bwsix.github.io/r/1">
        VFLC
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Footer = () => {
  return (
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 1,
        py: [3, 6],
      }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">
        <Grid item>Bob - 自主學習檔案系統</Grid>
        <Grid item>
          <Typography
            component="a"
            href="https://github.com/BWsix/bob"
            target="_blank"
            color="primary"
          >
            Github
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="a" href="https://github.com/BWsix" target="_blank" color="primary">
            VFLC(BWsix)
          </Typography>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
