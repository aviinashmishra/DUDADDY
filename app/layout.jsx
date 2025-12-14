import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "DuDaddy - Premium Ayurvedic Supplements",
    description: "DuDaddy - Premium Ayurvedic Supplements for Peak Performance",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <SessionProvider>
                    <StoreProvider>
                        <Toaster />
                        {children}
                    </StoreProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
