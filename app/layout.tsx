import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME, APP_SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({
	variable: "--font-inter-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: `%s | Rusos Store`,
		default: APP_NAME,
	},
	description: APP_DESCRIPTION,
	metadataBase: new URL(APP_SERVER_URL),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className}  antialiased`}>
				<ThemeProvider
				attribute='class'
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange>
				{children}
				<Toaster position="bottom-right" closeButton/>
				</ThemeProvider>
				</body>
		</html>
	);
}
