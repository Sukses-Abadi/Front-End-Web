import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/home/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to Sukses Abadi Apparel Store",
  description:
    "Leading Apparel E-commerce Store that sell high quality products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Navbar />
        </nav>
        <ToastContainer />
        <main className=" mx-auto "> {children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
