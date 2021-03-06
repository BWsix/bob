import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { getAntiCSRFToken, Routes, useRouter } from "blitz";
import { FormikProps, useFormik } from "formik";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { acceptedMimeTypes, fileSizeLimit } from "../constants";
import { CreateFile, descriptionMaxLength, UpdateFile } from "../validations";
import { AttachmentViewer } from "./AttachmentViewer";

export const FORM_ERROR = "FORM_ERROR";

type CreateFileType = z.infer<typeof UpdateFile>;

interface OnSubmitResult {
  fileId?: string;
  FORM_ERROR?: string;
  [prop: string]: any;
}

interface FileFormProps {
  submitText: string;
  onSubmit: (values: CreateFileType) => Promise<void | OnSubmitResult>;
  initialValues?: FormikProps<CreateFileType>["initialValues"] & { attachmentFileName?: string };
}

export const FileForm: React.FC<FileFormProps> = ({ submitText, initialValues, onSubmit }) => {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const [acceptedFile, setAcceptedFile] = useState<File>();
  const [attachmentFileName, setAttachmentFileName] = useState<string | undefined>(
    initialValues?.attachmentFileName
  );
  const [isUploading, setIsUploading] = useState(false);

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: acceptedMimeTypes,
    maxFiles: 1,
    maxSize: fileSizeLimit,
    onDrop: ([acceptedFile]) => {
      setAcceptedFile(acceptedFile);
      setAttachmentFileName(acceptedFile?.name);
    },
  });

  const formik = useFormik<FormikProps<CreateFileType>["initialValues"]>({
    initialValues: initialValues || { title: "" },
    validationSchema: toFormikValidationSchema(CreateFile),
    onSubmit: async (values, { setErrors }) => {
      const { fileId, FORM_ERROR, ...otherErrors } =
        (await onSubmit({ ...values, clientNoFileName: !Boolean(attachmentFileName) })) || {};

      if (FORM_ERROR) {
        setFormError(FORM_ERROR);
      }

      if (Object.keys(otherErrors).length > 0) {
        setErrors(otherErrors);
      } else if (acceptedFile) {
        const antiCSRFToken = getAntiCSRFToken();
        const axiosPostConfig = {
          headers: { "content-type": "multipart/form-data", "anti-csrf": antiCSRFToken },
          onUploadProgress: () => {
            setIsUploading(true);
          },
        };

        const formData = new FormData();
        formData.append("attachment", acceptedFile);
        formData.append("fileId", fileId!);

        const result = await axios.post("/api/upload", formData, axiosPostConfig);
        if (result.status !== 200) {
          setFormError(result.data);
        }

        setIsUploading(false);
      }

      router.push(Routes.ShowFilePage({ fileId: fileId! }));
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoFocus
              required
              name="title"
              label="??????"
              color="secondary"
              value={formik.values.title || ""}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              name="description"
              label="??????"
              color="secondary"
              rows={Math.max(5, (formik.values.description?.split("\n").length || 0) + 3)} // min: 5, max: lines + 3
              aria-describedby="field-description"
              value={formik.values.description || ""}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <FormHelperText
              id="field-description"
              error={
                !!formik.values.description &&
                formik.values.description.length > descriptionMaxLength
              }
            >
              ???????????? {descriptionMaxLength - (formik.values.description?.length || 0)}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="externalUrl"
              label="????????????"
              color="secondary"
              value={formik.values.externalUrl || ""}
              onChange={formik.handleChange}
              error={formik.touched.externalUrl && Boolean(formik.errors.externalUrl)}
              helperText={formik.touched.externalUrl && formik.errors.externalUrl}
            />
          </Grid>

          <Grid item xs={12}>
            {attachmentFileName ? (
              <>
                ????????????{" "}
                <Chip
                  variant="outlined"
                  label={attachmentFileName}
                  onDelete={() => {
                    setAcceptedFile(undefined);
                    setAttachmentFileName(undefined);
                  }}
                />
              </>
            ) : (
              <Paper
                {...getRootProps()}
                variant="outlined"
                sx={{
                  paddingY: 2,
                  cursor: "pointer",
                  backgroundColor: "#00000000",
                }}
              >
                <input {...getInputProps()} />
                <Typography textAlign="center" color={fileRejections.length ? "red" : "secondary"}>
                  {fileRejections[0]?.errors[0]?.code || "????????????????????????????????????(<4mb)"}
                </Typography>
              </Paper>
            )}
          </Grid>

          {formError && (
            <Typography variant="h5" color="red">
              {formError}
            </Typography>
          )}

          {acceptedFile && (
            <Grid item xs={12}>
              <AttachmentViewer file={acceptedFile} />
            </Grid>
          )}

          <Grid item xs={6} md={4}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              fullWidth
              disabled={formik.isSubmitting || isUploading}
            >
              {formik.isSubmitting || isUploading ? <CircularProgress size={24} /> : submitText}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
