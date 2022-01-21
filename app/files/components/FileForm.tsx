import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CreateFile } from "../validations";

export const FORM_ERROR = "FORM_ERROR";

type CreateFileType = z.infer<typeof CreateFile>;

interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: any;
}

interface FileFormProps {
  submitText: string;
  onSubmit: (values: CreateFileType) => Promise<void | OnSubmitResult>;
  initialValues?: FormikProps<CreateFileType>["initialValues"];
}

export const FileForm: React.FC<FileFormProps> = ({ submitText, initialValues, onSubmit }) => {
  const [formError, setFormError] = useState<string | null>(null);

  const formik = useFormik<FormikProps<CreateFileType>["initialValues"]>({
    initialValues: initialValues || { title: "" },
    validationSchema: toFormikValidationSchema(CreateFile),
    onSubmit: async (values, { setErrors }) => {
      const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {};

      if (FORM_ERROR) {
        setFormError(FORM_ERROR);
      }

      if (Object.keys(otherErrors).length > 0) {
        setErrors(otherErrors);
      }
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

        {formError && (
          <Typography variant="h5" color="red">
            {formError}
          </Typography>
        )}

        <Button color="primary" variant="contained" fullWidth type="submit">
          {submitText}
        </Button>
      </form>
    </>
  );
};
