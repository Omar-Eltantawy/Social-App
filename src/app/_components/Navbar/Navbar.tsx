// "use client";
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { UserState } from '@/lib/types';
// import { useEffect, useState } from 'react';
// import { store } from '@/lib/Redux/store';
// import { getUserData, logout } from '@/lib/Redux/userSlice';
// import { useRouter } from 'next/navigation';

// const pages = [
//     {
//         text:"Profile",
//         link:"profile"
//     }
// ];
// const settings = [
//     {
//         text:"Login",
//         link:"login"
//     },
//     {
//         text:"Register",
//         link:"register"
//     }
// ];

// function Navbar() {
//   const router = useRouter();
//   const {user,token} = useSelector((state: { userReducer: UserState }) => state.userReducer);
//   const dispatch = useDispatch<typeof store.dispatch>();
//   console.log(user);
  
//   useEffect(()=>{
//     if(token){
//       dispatch(getUserData());
//     }
//   },[token])
  
//   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
//   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             Social
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: 'block', md: 'none' } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page.text} onClick={handleCloseNavMenu}>
//                   <Typography component={Link} href={`/${page.link}`} sx={{ textAlign: 'center',textDecoration:'none' ,color:'black' }}>{page.text}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             Social
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page.link}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 <Typography component={Link} href={`/${page.link}`} sx={{ textAlign: 'center' ,textDecoration:'none',color:'white'  }}>{page.text}</Typography>
//               </Button>
//             ))}
//           </Box>
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <p style={{margin:5,color:"#fff"}}>{user?.name}</p>
//                 <Avatar alt="Remy Sharp" src={user?.photo} />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
//                   <Typography component={Link} href={`/${setting.link}`} sx={{ textAlign: 'center',textDecoration:'none' , color:"black" }}>{setting.text}</Typography>
//                 </MenuItem>
//               ))}
//               {user? (
//                 <MenuItem key='logout' onClick={handleCloseUserMenu}>
//                    <Button
//                       onClick={() => {dispatch(logout())   
//                          router.push('/login');  }}
//                       sx={{ color: 'black', textTransform: 'none' }}
//                       fullWidth
//                     >
//                       Logout
//                     </Button>
//                 </MenuItem>
//               ):null}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default Navbar;


"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, logout } from "@/lib/Redux/userSlice";
import { UserState } from "@/lib/types";
import { store } from "@/lib/Redux/store";

const pages = [
  { text: "Home", link: "" },
  { text: "Profile", link: "profile" },
];

const settings = [
  { text: "Login", link: "login" },
  { text: "Register", link: "register" },
];

function Navbar() {
  const router = useRouter();
  const { user, token } = useSelector((state: { userReducer: UserState }) => state.userReducer);
  const dispatch = useDispatch<typeof store.dispatch>();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (token) dispatch(getUserData());
  }, [token]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo & Brand */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            component={Link}
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Social
          </Typography>

          {/* Mobile Nav Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    href={`/${page.link}`}
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Brand Mobile */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Social
          </Typography>

          {/* Desktop Nav Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.link}
                onClick={handleCloseNavMenu}
                sx={{ color: "white", textTransform: "none" }}
              >
                <Link href={`/${page.link}`} style={{ textDecoration: "none", color: "white" }}>
                  {page.text}
                </Link>
              </Button>
            ))}
          </Box>

          {/* User Avatar / Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user && (
                  <Typography sx={{ color: "white", mr: 1 }}>{user.name}</Typography>
                )}
                <Avatar alt={user?.name} src={user?.photo || ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {!user &&
                settings.map((setting) => (
                  <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                    <Link
                      href={`/${setting.link}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {setting.text}
                    </Link>
                  </MenuItem>
                ))}
              {user && (
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  dispatch(logout());
                  router.push("/login");
                }}>
                  <Typography sx={{ color: "black" }}>Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
