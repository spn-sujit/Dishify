import { Inter} from "next/font/google";
import "./globals.css";
import Header from "../components/ui/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism, shadcn } from '@clerk/ui/themes'
import { Toaster } from "../components/ui/sonner";
const inter=Inter({subsets:["latin"]});

export const metadata = {
  title: "Dishify-AI Recipes Platform",
  description: "AI-powered recipe platform for developers",
  icons: {
    icon: "/logo1.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{theme: neobrutalism,variables: { colorPrimary: "#ea580c", colorText: "#18181b", colorBackground: "#ffffff", colorInputBackground: "#ffffff", colorInputText: "#18181b", colorNeutral: "#52525b", borderRadius: "14px", shadowPrimary: "0 6px 18px rgba(234,88,12,0.22)" }, elements: { card: "shadow-2xl border border-orange-100 rounded-2xl", formButtonPrimary: "bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all duration-200", socialButtonsBlockButton: "border border-stone-200 hover:border-orange-300 hover:bg-orange-50 rounded-xl transition-all duration-200", socialButtonsBlockButtonText: "text-stone-700 font-medium", formFieldInput: "rounded-xl border-stone-300 focus:border-orange-500 focus:ring-orange-500", footerActionLink: "text-orange-600 hover:text-orange-700 font-medium", modalCloseButton: "text-orange-500 hover:bg-orange-50 hover:text-orange-600 rounded-full" }}}>
    <html
      lang="en" suppressHydrationWarning
      className={`${inter.className}`}
    >
     <body className={`${inter.className} bg-[#fff7ed] text-black dark:bg-black dark:text-white`}>
      <Header/>
      <main className="min-h-screen">
      {children}
      </main>
      <Toaster/>
  <footer className="mt-10 border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
  Made with <span className="text-red-500">❤️</span> by{" "}
  <b className="text-gray-800 dark:text-white">Sujit</b> for Dishify AI Recipe Platform
</footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
