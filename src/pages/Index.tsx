import { useState } from "react";
import WalletConnect from "@/components/WalletConnect";
import RegistrationForm from "@/components/RegistrationForm";
import Dashboard from "@/components/Dashboard";

type AppState = "connect" | "register" | "dashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("connect");
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState<any>(null);
  const [studentName, setStudentName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");

  const handleWalletConnect = (walletAddress: string, walletSigner: any) => {
    setAddress(walletAddress);
    setSigner(walletSigner);
    setAppState("register");
  };

  const handleRegistered = () => {
    // In a real app, fetch student data from contract
    setStudentName("Estudante Demo");
    setStudentSchool("Escola Demo");
    setAppState("dashboard");
  };

  const handleLogout = () => {
    setAddress("");
    setSigner(null);
    setStudentName("");
    setStudentSchool("");
    setAppState("connect");
  };

  if (appState === "connect") {
    return <WalletConnect onConnect={handleWalletConnect} />;
  }

  if (appState === "register") {
    return <RegistrationForm signer={signer} onRegistered={handleRegistered} />;
  }

  return (
    <Dashboard
      address={address}
      signer={signer}
      studentName={studentName}
      studentSchool={studentSchool}
      onLogout={handleLogout}
    />
  );
};

export default Index;
