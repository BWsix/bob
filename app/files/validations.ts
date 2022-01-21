import { z } from "zod";

const baseQuery = z.object({
  fileId: z
    .string()
    .optional()
    .refine((id) => id?.length === 10, "Invalid fileId"),
});

const baseAttr = z.object({
  title: z.string().nonempty(),
  description: z.string().nullish(),
  externalUrl: z.string().nullish(),
});

export const GetFile = baseQuery;

export const UpdateFile = baseQuery.merge(baseAttr);

export const CreateFile = baseAttr;

export const DeleteFile = baseQuery;
