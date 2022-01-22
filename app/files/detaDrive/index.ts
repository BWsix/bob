import { Deta } from "deta";

function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

assert(process.env.DETA_PROJECT_KEY, "You must provide the DETA_PROJECT_KEY env variable");

const deta = Deta(process.env.DETA_PROJECT_KEY);
export const drive = deta.Drive("attachments");
