/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { withReactPlayer } from "../constants";

interface Props {
  file: File | Blob;
}

export const AttachmentViewer = ({ file }: Props) => {
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  if (withReactPlayer.includes(file.type)) {
    return <ReactPlayer url={url} controls={true} width="100%" height="auto" />;
  } else {
    return <img src={url} alt="" width="100%" height="auto" />;
  }
};
