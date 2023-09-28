import HeaderApp from "@/components/base/header";
import "../globals.css";
import "daisyui/dist/full.css";
import ProviderWrapper from "@/components/base/providerWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <HeaderApp />
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
