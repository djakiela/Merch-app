import { Session } from "@supabase/supabase-js";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "../src/context/ThemeContext";
import { supabase } from "../src/lib/supabase";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false); // Nowy stan: czy sprawdziliśmy już sesję?
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // 1. Sprawdzenie sesji przy starcie
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    // 2. Nasłuchiwanie zmian (logowanie/wylogowanie)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsReady(true);
      },
    );

    // Dobra praktyka: sprzątanie subskrypcji
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Jeśli jeszcze nie sprawdziliśmy sesji, nie robimy nic
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    // setTimeout(..., 0) przesuwa wykonanie na koniec kolejki,
    // dając czas na zamontowanie komponentów Stack
    const timeout = setTimeout(() => {
      if (!session && !inAuthGroup) {
        // Nie ma sesji i nie jesteśmy w logowaniu -> idź do logowania
        router.replace("/login");
      } else if (session && inAuthGroup) {
        // Jest sesja i jesteśmy w logowaniu -> idź do głównej apki
        router.replace("/");
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [session, segments, isReady]);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
