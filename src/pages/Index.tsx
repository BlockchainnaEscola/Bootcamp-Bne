import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Auth from "@/components/Auth";
import Home from "@/components/Home";
import Dashboard from "@/components/Dashboard";

type AppState = "auth" | "home" | "day";

const Index = () => {
  const { user, loading } = useAuth();
  const [appState, setAppState] = useState<AppState>("auth");
  const [profile, setProfile] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    if (user && !loading) {
      loadProfile();
    } else if (!loading) {
      setAppState("auth");
    }
  }, [user, loading]);

  const loadProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error loading profile:', error);
      return;
    }

    setProfile(data);
    setAppState("home");
  };

  const handleAuthenticated = () => {
    loadProfile();
  };

  const handleLogout = async () => {
    const { signOut } = useAuth();
    await signOut();
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

  if (!user || appState === "auth") {
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
