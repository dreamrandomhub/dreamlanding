import "./globals.css";

export const metadata = {
  title: "Илья Кожа — вайб-код разработчик",
  description:
    "Персональные приложения для тебя: от манифеста до готовых продуктов, которые легко развернуть он-лайн.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
