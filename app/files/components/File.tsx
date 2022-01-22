import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { File as FileModel } from "@prisma/client";

interface Props {
  file: FileModel;
}

export const File = ({ file }: Props) => {
  return (
    <>
      <CardActionArea component="a" href={`/dashboard/${file.id}`}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1, backgroundColor: "#0e001d" }}>
            <Typography component="h2" variant="h5">
              {file.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {file.updatedAt.toLocaleDateString()}
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              style={{ display: "inline-block", whiteSpace: "pre-line" }}
            >
              {file.description}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </>
  );
};
