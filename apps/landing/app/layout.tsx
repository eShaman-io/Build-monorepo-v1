"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@eshamanio/i18n";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@eshamanio/ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>{children}</AuthProvider>
        </I18nextProvider>
        <Analytics />
      </body>
    </html>
  );
}
