import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import { Link } from "blitz";

interface Props {
  meta: {
    name: string;
    path?: string;
  }[];
}

export const Breadcrumb = ({ meta }: Props) => {
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
      <Breadcrumbs>
        {meta.map(({ name, path }) =>
          path ? (
            <Link key={path} href={path}>
              <MuiLink color="secondary" sx={{ cursor: "pointer" }}>
                {name}
              </MuiLink>
            </Link>
          ) : (
            <MuiLink color="secondary" sx={{ cursor: "pointer" }}>
              {name}
            </MuiLink>
          )
        )}
      </Breadcrumbs>
    </Container>
  );
};
