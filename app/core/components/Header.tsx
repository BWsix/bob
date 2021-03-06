import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import logout from "app/auth/mutations/logout";
import { useMutation } from "blitz";
import { Suspense, useState } from "react";
import { AvatarLoader } from "./gadgets/AvatarLoader";

const menuItems = [
  <Button
    key="github"
    href="https://github.com/BWsix/bob"
    target="_blank"
    endIcon={<OpenInNewIcon />}
    sx={{ color: "white", textTransform: "none" }}
  >
    GitHub
  </Button>,
];

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Header = (props) => {
  const [logoutMutation] = useMutation(logout);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky" enableColorOnDark={true}>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Typography
              noWrap
              variant="h6"
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Bob - ????????????????????????
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                keepMounted
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {menuItems}
              </Menu>
            </Box>
            <Typography
              noWrap
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Bob - ????????????????????????
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>{menuItems}</Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="????????????">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Suspense fallback={<AccountCircleIcon fontSize="large" />}>
                    <AvatarLoader />
                  </Suspense>
                </IconButton>
              </Tooltip>
              <Menu
                keepMounted
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={async () => await logoutMutation()}>
                  <Typography textAlign="center">??????</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
