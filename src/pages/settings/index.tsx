import React from "react";

import SettingsModal from "@/pages/settings/components/settingsModal";

function SettingsPage() {
  return (
    <div className="w-full flex ">
      <div className="space-y-5 w-full">
        <SettingsModal />
      </div>
    </div>
  );
}

export default SettingsPage;
