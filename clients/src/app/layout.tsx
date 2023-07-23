import "./globals.css";
import "daisyui/dist/full.css";
import ProviderWrapper from "./providerWrapper";

export default function RootLayout({
  children,
  store,
  games,
  post,
}: {
  children: React.ReactNode;
  store: React.ReactNode;
  games: React.ReactNode;
  post: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Forum Gamers</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body style={{backgroundColor: '#252525'}}>
        <ProviderWrapper>
          {/* layouting per sectionnya disini,hrs di dalam providerWrapper */}
          {post}
          {games}
          {store}
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
