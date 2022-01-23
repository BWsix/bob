import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { File as FileModel } from "@prisma/client";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";

interface Props {
  file: FileModel & { attachment: { attachmentTitle: string }[] };
}

export const File = ({ file }: Props) => {
  return (
    <>
      <CardActionArea component="a" href={`/dashboard/${file.id}`}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
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

            <Typography component="div">
              {Boolean(file.attachment?.length) && (
                <Chip
                  variant="outlined"
                  label={file!.attachment![0]!.attachmentTitle}
                  icon={<AttachFileOutlinedIcon />}
                />
              )}{" "}
              {Boolean(file.externalUrl) && (
                <Chip
                  variant="outlined"
                  label={file.externalUrl}
                  icon={<InsertLinkOutlinedIcon />}
                />
              )}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </>
  );
};
