import Avatar from "@mui/material/Avatar";
import { useSession } from "blitz";

export const AvatarLoader = () => {
  const session = useSession();

  return <Avatar alt={session.userName} src={session.avatar} />;
};
