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
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import logout from "app/auth/mutations/logout";
import { useMutation } from "blitz";
import { Suspense, useState } from "react";
import AvatarLoader from "./gadgets/AvatarLoader";

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

const Header = () => {
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
    <AppBar position="static" enableColorOnDark={true}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography
            noWrap
            variant="h6"
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Bob - 自主學習檔案系統
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
            Bob - 自主學習檔案系統
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>{menuItems}</Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="開啟選單">
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
                <Typography textAlign="center">登出</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
