import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ExternalLink from "../public/external-link.svg";
import Github from "../public/github.svg";
import Safe from "../public/safe.svg";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Schedule Trade using ERC-7579",
  description:
    "Fully decentralized way selling treasury token selling for Dao's using 7579",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <a href="https://safe.global">
            <Safe width={95} height={36} />
          </a>
          <div style={{ display: "flex" }}>
            <a
              href="https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "1rem",
              }}
            >
              Read More <ExternalLink style={{ marginLeft: "0.5rem" }} />
            </a>
            <a
              href="https://github.com/5afe/safe-tutorial-7579"
              style={{ display: "flex", alignItems: "center" }}
            >
              View on GitHub{" "}
              <Github width={24} height={24} style={{ marginLeft: "0.5rem" }} />
            </a>
          </div>
        </nav> */}
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1>Schedule Transfers</h1>

          <div>
            Create a new ERC-7579-compatible Smart and use it to schedule Sell
            Treasury.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "40px",
            marginRight: "40px",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
