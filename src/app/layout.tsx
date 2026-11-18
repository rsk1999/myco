import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'MYCO Global Distributors | Skincare, Wellness & Bulk Distribution',
  description: 'MYCO Global Distributors Limited - Leading e-commerce marketplace for authentic skincare, haircare, and organic wellness products. Fast Delivery & Wholesale pricing.',
  keywords: ['MYCO', 'myco global distributors', 'skincare', 'wellness', 'ayurveda', 'wholesale cosmetic distributor']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="font-sans bg-[#f1f2f4] text-[#212121] antialiased">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
