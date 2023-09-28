import "../globals.css";
// import "daisyui/dist/full.css";
import ProviderWrapper from "@/components/base/providerWrapper";
import HeaderApp from "@/components/base/header";
import BasePage from "@/components/base/basePage";

export default function RootLayout({
  children,
  store,
  tour,
  post,
}: {
  children: React.ReactNode;
  store: React.ReactNode;
  tour: React.ReactNode;
  post: React.ReactNode;
}) {
  return (
    <html lang="en">
      <HeaderApp />
      <body style={{ backgroundColor: "#252525" }}>
        <ProviderWrapper>
          <BasePage>
            {children}
            {post}
            {store}
            {tour}
          </BasePage>
        </ProviderWrapper>
      </body>
    </html>
  );
}
