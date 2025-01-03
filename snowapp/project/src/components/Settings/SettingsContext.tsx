import React, { createContext, useContext, useState } from 'react';

interface SettingsState {
  authentication: {
    mfa: boolean;
    sso: boolean;
  };
  security: {
    ipWhitelist: string;
    sessionTimeout: number;
  };
  warehouse: {
    autoSuspendTimeout: number;
    autoResume: boolean;
  };
  notifications: {
    email: boolean;
    usageAlerts: boolean;
  };
  cloud: {
    provider: string;
    region: string;
    storage: string;
  };
}

interface SettingsContextType {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, values: any) => void;
  saveSettings: () => Promise<void>;
}

const defaultSettings: SettingsState = {
  authentication: {
    mfa: false,
    sso: false,
  },
  security: {
    ipWhitelist: '',
    sessionTimeout: 30,
  },
  warehouse: {
    autoSuspendTimeout: 10,
    autoResume: true,
  },
  notifications: {
    email: true,
    usageAlerts: true,
  },
  cloud: {
    provider: 'AWS',
    region: 'us-east-1',
    storage: 'S3',
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  const updateSettings = (section: keyof SettingsState, values: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...values,
      },
    }));
  };

  const saveSettings = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Settings saved:', settings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};