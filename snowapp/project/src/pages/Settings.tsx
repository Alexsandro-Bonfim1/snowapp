import React, { useState } from 'react';
import { Save, Key, Shield, Bell, Database, Cloud } from 'lucide-react';
import { SettingsProvider, useSettings } from '../components/Settings/SettingsContext';
import CloudSettings from '../components/Settings/CloudSettings';

const SettingSection = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
    <div className="flex items-center gap-2 pb-4 border-b">
      <Icon className="w-5 h-5 text-blue-600" />
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

const SettingsContent = () => {
  const { settings, updateSettings, saveSettings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveSettings();
    setIsSaving(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      
      <div className="grid gap-6">
        <SettingSection icon={Cloud} title="Cloud Configuration">
          <CloudSettings />
        </SettingSection>

        <SettingSection icon={Key} title="Authentication">
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.authentication.mfa}
                  onChange={(e) => updateSettings('authentication', { mfa: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Enable Multi-Factor Authentication</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.authentication.sso}
                  onChange={(e) => updateSettings('authentication', { sso: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Allow SSO Authentication</span>
              </label>
            </div>
          </div>
        </SettingSection>

        <SettingSection icon={Shield} title="Security">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Network Access</label>
              <input
                type="text"
                value={settings.security.ipWhitelist}
                onChange={(e) => updateSettings('security', { ipWhitelist: e.target.value })}
                placeholder="IP Whitelist (comma-separated)"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSettings('security', { sessionTimeout: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </SettingSection>

        <SettingSection icon={Database} title="Warehouse Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Auto-suspend Timeout (minutes)</label>
              <input
                type="number"
                value={settings.warehouse.autoSuspendTimeout}
                onChange={(e) => updateSettings('warehouse', { autoSuspendTimeout: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.warehouse.autoResume}
                  onChange={(e) => updateSettings('warehouse', { autoResume: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Auto-resume Warehouses</span>
              </label>
            </div>
          </div>
        </SettingSection>

        <SettingSection icon={Bell} title="Notifications">
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => updateSettings('notifications', { email: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Email Notifications</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.usageAlerts}
                  onChange={(e) => updateSettings('notifications', { usageAlerts: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Warehouse Usage Alerts</span>
              </label>
            </div>
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

const Settings = () => (
  <SettingsProvider>
    <SettingsContent />
  </SettingsProvider>
);

export default Settings;