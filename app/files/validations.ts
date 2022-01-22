import { z } from "zod";

export const descriptionMaxLength = 420;

const baseQuery = z.object({
  fileId: z
    .string()
    .optional()
    .refine((id) => id?.length === 10, "Invalid fileId"),
});

const baseAttr = z.object({
  title: z.string().nonempty(),
  description: z
    .string()
    .nullish()
    .refine((text) => !text || text.length <= descriptionMaxLength, "字數超過限制"),
  externalUrl: z.string().nullish(),
});

export const GetFile = baseQuery;

export const UpdateFile = baseQuery.merge(baseAttr);

export const CreateFile = baseAttr;

export const DeleteFile = baseQuery;
