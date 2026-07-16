import "./globals.css";

export const metadata = {
  title: "Supportly — AI Customer Support",
  description: "Transform customer support with AI-powered conversations and enterprise-grade automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
