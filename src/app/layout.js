import NavBar from "./components/navbar/NavBar";  // Update the path to reflect 'navbar' folder
import Footer from "./components/footer/Footer";  // Ensure 'footer' is correct
import AppProvider from "../providers/AppProvider";

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <NavBar />
      {children}
      <Footer />
    </AppProvider>
  );
}
