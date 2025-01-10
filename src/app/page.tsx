import AppBar from "./components/AppBar";
import AuthDesign from "./components/AuthDesign";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <AuthDesign/>
      <main className="flex-1">
        
      </main>
    </div>
  );
}
