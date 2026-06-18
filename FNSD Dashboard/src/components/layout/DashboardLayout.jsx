import { memo, useCallback, useState } from "react";

import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import FilterBar from "./FilterBar";

function DashboardLayout({ children, filterBarProps }) {
  // UI State Management
  // This local React state controls sidebar collapse/expand behavior.
  // No backend API is required for this state because it is only a UI interaction.
  // In future, user preference can optionally be saved in localStorage or backend user settings.

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleToggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const handleMenuSelect = useCallback((menuId) => {
    setActiveMenu(menuId);
  }, []);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        activeMenu={activeMenu}
        onMenuSelect={handleMenuSelect}
      />

      <div id="main-wrap" className={collapsed ? "expanded" : ""}>
        <TopHeader onToggleSidebar={handleToggleSidebar} />
        <FilterBar {...filterBarProps} />

        <main id="main-body">{children}</main>
      </div>
    </>
  );
}

export default memo(DashboardLayout);