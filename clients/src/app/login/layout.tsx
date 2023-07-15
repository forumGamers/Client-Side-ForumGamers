import { GoogleOAuthProvider } from "@/components/global";
const googleClientId = process.env.GOOGLE_OAUTH_CLIENTID as string;

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section>
      <GoogleOAuthProvider clientId={googleClientId}>
        {children}
      </GoogleOAuthProvider>
    </section>
  );
}
