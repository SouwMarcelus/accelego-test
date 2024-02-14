import "./globals.css";

export const metadata = {
  title: "Random Anime Quotes",
  description: "A project for Accelego's test case.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 h-screen w-screen p-0 font-sans">{children}</body>
    </html>
  );
}
