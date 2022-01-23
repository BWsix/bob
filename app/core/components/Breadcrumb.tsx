import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { Link } from "blitz";

interface Props {
  meta: {
    name: string;
    path?: string;
  }[];
}

export const Breadcrumb: React.FC<Props> = ({ meta, children }) => {
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Breadcrumbs>
            {meta.map(({ name, path }) =>
              path ? (
                <Link key={name} href={path}>
                  <MuiLink sx={{ cursor: "pointer" }}>{name}</MuiLink>
                </Link>
              ) : (
                <MuiLink key={name} sx={{ cursor: "pointer" }}>
                  {name}
                </MuiLink>
              )
            )}
          </Breadcrumbs>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Container>
  );
};
