import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { supabase } from "@/integrations/supabase/client";
import Auth from "@/components/Auth";
import Home from "@/components/Home";
import Dashboard from "@/components/Dashboard";

type AppState = "auth" | "home" | "day";

const Index = () => {
  const address = useAddress();
  const [appState, setAppState] = useState<AppState>("auth");
  const [profile, setProfile] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      loadProfile();
    } else {
      setAppState("auth");
      setLoading(false);
    }
  }, [address]);

  const loadProfile = async () => {
    if (!address) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('wallet_address', address)
      .single();

    if (error) {
      console.error('Error loading profile:', error);
      setAppState("auth");
      setLoading(false);
      return;
    }

    setProfile(data);
    setAppState("home");
    setLoading(false);
  };

  const handleAuthenticated = () => {
    loadProfile();
  };

  const handleLogout = async () => {
    setProfile(null);
    setAppState("auth");
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setAppState("day");
  };

  const handleBackToHome = () => {
    setAppState("home");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg font-bold">Carregando...</p>
      </div>
    );
  }

  if (!address || appState === "auth") {
    return <Auth onAuthenticated={handleAuthenticated} />;
  }

  if (appState === "home" && profile) {
    return (
      <Home
        profile={profile}
        onLogout={handleLogout}
        onSelectDay={handleSelectDay}
      />
    );
  }

  if (appState === "day" && profile) {
    return (
      <Dashboard
        profile={profile}
        selectedDay={selectedDay}
        onLogout={handleLogout}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return null;
};

export default Index;
