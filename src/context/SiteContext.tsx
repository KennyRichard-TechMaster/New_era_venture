import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

type SettingsMap = Record<string, string>;

type SiteContextType = {
  settings: SettingsMap;
  refreshSettings: () => Promise<void>;
};

const SiteContext = createContext<SiteContextType>({
  settings: {},
  refreshSettings: async () => {},
});

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingsMap>({});

  async function fetchSettings() {
    const { data } = await supabase.from('site_settings').select('key, value');
    if (data) {
      const map: SettingsMap = {};
      data.forEach((row) => { map[row.key] = row.value ?? ''; });
      setSettings(map);
    }
  }

  useEffect(() => { fetchSettings(); }, []);

  return (
    <SiteContext.Provider value={{ settings, refreshSettings: fetchSettings }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteContext);
}
