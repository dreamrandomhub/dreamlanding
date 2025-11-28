import "./globals.css";

export const metadata = {
  title: "Илья Кожа — вайб-код разработчик",
  description:
    "Персональные приложения под твой вайб: от манифеста до готовых продуктов, которые легко задеплоить на Vercel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
