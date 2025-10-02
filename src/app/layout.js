export const metadata = {
  title: 'Nirmit Shah - Software Engineer',
  description: 'Portfolio of Nirmit Shah - Full Stack Developer'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


import './globals.css';  