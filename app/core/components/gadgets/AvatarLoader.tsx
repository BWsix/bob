import Avatar from "@mui/material/Avatar";
import { useSession } from "blitz";

const AvatarLoader = () => {
  const session = useSession();

  return <Avatar alt={session.userName} src={session.avatar} />;
};

export default AvatarLoader;
