import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Navbar from './_components/Navbar/Navbar'
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./_components/ReduxProvider/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <ReduxProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar/>
            {children}
            <Toaster/>
          </ThemeProvider>
      </AppRouterCacheProvider>
      </ReduxProvider>
      </body>
    </html>
  );
}
