// src/app/layout.js

import './globals.css'; // Ensure this import is present

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Snack Tracker</title>
        <meta name="description" content="Your App Description" />
      </head>
      <body>{children}</body>
    </html>
  );
}
