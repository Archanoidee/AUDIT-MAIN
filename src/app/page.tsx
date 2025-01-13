import AppBar from "./components/AppBar";
import AuthDesign from "./components/AuthDesign";
import Login from "./(auth)/login/page";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <AppBar />
      <AuthDesign/> */}
      <Login/>
      <main className="flex-1">
        
      </main>
    </div>
  );
}
