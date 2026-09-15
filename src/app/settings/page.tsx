import { SettingsForm } from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage multilingual preferences, weather units, notifications, and voice parameters.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}
