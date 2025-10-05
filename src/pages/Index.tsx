import { useState } from "react";
import WalletConnect from "@/components/WalletConnect";
import RegistrationForm from "@/components/RegistrationForm";
import Home from "@/components/Home";
import Dashboard from "@/components/Dashboard";

type AppState = "connect" | "register" | "home" | "day";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("connect");
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState<any>(null);
  const [studentName, setStudentName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [selectedDay, setSelectedDay] = useState(1);

  const handleWalletConnect = (walletAddress: string, walletSigner: any) => {
    setAddress(walletAddress);
    setSigner(walletSigner);
    setAppState("register");
  };

  const handleRegistered = () => {
    // In a real app, fetch student data from contract
    setStudentName("Estudante Demo");
    setStudentSchool("Escola Demo");
    setAppState("home");
  };

  const handleLogout = () => {
    setAddress("");
    setSigner(null);
    setStudentName("");
    setStudentSchool("");
    setAppState("connect");
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setAppState("day");
  };

  const handleBackToHome = () => {
    setAppState("home");
  };

  if (appState === "connect") {
    return <WalletConnect onConnect={handleWalletConnect} />;
  }

  if (appState === "register") {
    return <RegistrationForm signer={signer} onRegistered={handleRegistered} />;
  }

  if (appState === "home") {
    return (
      <Home
        address={address}
        signer={signer}
        studentName={studentName}
        studentSchool={studentSchool}
        onLogout={handleLogout}
        onSelectDay={handleSelectDay}
      />
    );
  }

  return (
    <Dashboard
      address={address}
      signer={signer}
      studentName={studentName}
      studentSchool={studentSchool}
      selectedDay={selectedDay}
      onLogout={handleLogout}
      onBackToHome={handleBackToHome}
    />
  );
};

export default Index;
