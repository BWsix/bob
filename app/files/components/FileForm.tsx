import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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
import { CreateFile } from "../validations";

export const FORM_ERROR = "FORM_ERROR";

type CreateFileType = z.infer<typeof CreateFile>;

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
  const [attachmentFileName, setAttachmentFileName] = useState<string | undefined>(
    initialValues?.attachmentFileName
  );
  const [isUploading, setIsUploading] = useState(false);

  const antiCSRFToken = getAntiCSRFToken();
  const axiosPostConfig = {
    headers: { "content-type": "multipart/form-data", "anti-csrf": antiCSRFToken },
    onUploadProgress: () => {
      setIsUploading(true);
    },
  };

  const {
    acceptedFiles: [acceptedFile],
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: acceptedMimeTypes,
    maxFiles: 1,
    maxSize: fileSizeLimit,
    onDrop: ([acceptedFile]) => {
      console.log("acceptedFile", acceptedFile);
      setAttachmentFileName(acceptedFile?.name);
    },
  });

  const formik = useFormik<FormikProps<CreateFileType>["initialValues"]>({
    initialValues: initialValues || { title: "" },
    validationSchema: toFormikValidationSchema(CreateFile),
    onSubmit: async (values, { setErrors }) => {
      const { fileId, FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {};

      if (FORM_ERROR) {
        setFormError(FORM_ERROR);
      }

      if (Object.keys(otherErrors).length > 0) {
        setErrors(otherErrors);
      } else if (acceptedFile) {
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="title"
          label="標題"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          name="description"
          label="敘述"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          fullWidth
          name="externalUrl"
          label="外部連結"
          value={formik.values.externalUrl}
          onChange={formik.handleChange}
          error={formik.touched.externalUrl && Boolean(formik.errors.externalUrl)}
          helperText={formik.touched.externalUrl && formik.errors.externalUrl}
        />

        <Paper>
          <div {...getRootProps()}>
            <p>Drag and drop some files here, or click to select files</p>
            <input {...getInputProps()} />
          </div>

          {fileRejections && (
            <Typography variant="h5" color="red">
              {fileRejections[0]?.errors[0]?.code}
            </Typography>
          )}
        </Paper>

        {attachmentFileName}

        {formError && (
          <Typography variant="h5" color="red">
            {formError}
          </Typography>
        )}

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={formik.isSubmitting || isUploading}
        >
          {formik.isSubmitting || isUploading ? <CircularProgress /> : submitText}
        </Button>
      </form>
    </>
  );
};
