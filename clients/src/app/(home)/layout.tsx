import "../globals.css";
// import "daisyui/dist/full.css";
import ProviderWrapper from "@/components/base/providerWrapper";
import HeaderApp from "@/components/base/header";
import BasePage from "@/components/base/basePage";

export default function RootLayout({
  children,
  // store,
  // tour,
}: {
  children: React.ReactNode;
  // store: React.ReactNode;
  // tour: React.ReactNode;
}) {
  return (
    <html lang="en">
      <HeaderApp />
      <body style={{ backgroundColor: "rgb(3, 7, 18)" }}>
        <ProviderWrapper>
          <BasePage>
            {children}
            {/* {store}
            {tour} */}
          </BasePage>
        </ProviderWrapper>
      </body>
    </html>
  );
}
