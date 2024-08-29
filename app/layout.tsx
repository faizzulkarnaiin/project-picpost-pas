import ReactQuery from "@/components/reactQuery";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "./theme/themeRegistry";
import { ReactNode } from "react";
import { Session } from "next-auth";
import NextAuthProvider from "@/components/nextAuthProvider";
import Loading from "@/components/loading";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Picpost",
  description: "Social Media Website For U :)",
};
interface NextAuthProps {
  children: ReactNode;
  session: Session | null | undefined;
}

export default function RootLayout({ children, session }: NextAuthProps) {
  return (
    <html lang="en" data-theme="light">
      <body className="overflow-x-hidden">
        <NextAuthProvider session={session}>
          <ReactQuery>
            <Loading>{children}</Loading>
          </ReactQuery>
        </NextAuthProvider>
      </body>
    </html>
  );
}
