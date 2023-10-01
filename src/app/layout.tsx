import AppProviders from "@/app/(common)/AppProviders";
import "@/styles/globals.scss";
import { ReactNode } from "react";
import Layout from "./(common)/Layout";

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: "Banadoro - Pomodoro Timer",
  description: "Turn on timer for studying, create tasks, compete with others!",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512.png",
  },
  themeColor: "#111827",
};

const RootLayout = ({ children }: Props) => {
  return (
    <html>
      {/*<head>*/}
      {/*  <title>{metadata.title}</title>*/}
      {/*  <meta name="description" content={metadata.description} />*/}
      {/*  <link rel="icon" href="/images/favicon.ico" sizes="any" />*/}
      {/*</head>*/}
      <body className="bg-gray-900 text-white scrollbar-none font-sans">
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
