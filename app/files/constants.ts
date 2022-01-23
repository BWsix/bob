export const withReactPlayer = ["video/mp4", "audio/mpeg"];
export const withReactFilePreviewer = ["image/jpeg", "image/png"];
export const acceptedMimeTypes = ["application/pdf", ...withReactPlayer, ...withReactFilePreviewer];

export const fileSizeLimit = 1024 ** 2 * 3.9; //api-route's 4 mb data transfer limit.
export const fieldName = "attachment";
