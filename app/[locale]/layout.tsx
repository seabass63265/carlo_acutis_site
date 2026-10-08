import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { SvgWipeProvider } from "@/components/shared/SvgWipeProvider";
import ScrollToTop from "@/components/shared/ScrollToTop";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: {
    default: "Friends of Carlo",
    template: "%s | Friends of Carlo",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SvgWipeProvider>
        <div style={{ animation: "fadeInPage 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }}>
          <ScrollToTop />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </SvgWipeProvider>
    </NextIntlClientProvider>
  );
}
