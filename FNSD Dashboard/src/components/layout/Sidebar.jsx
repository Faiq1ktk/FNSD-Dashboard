import { memo } from "react";

import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import WorkflowSteps from "./WorkflowSteps";

function Sidebar({ collapsed, activeMenu, onMenuSelect }) {
  return (
    <aside id="sidebar" className={collapsed ? "collapsed" : ""}>
      <SidebarLogo />

      <nav className="sidebar-nav">
        <SidebarMenu activeMenu={activeMenu} onMenuSelect={onMenuSelect} />
        <WorkflowSteps />
      </nav>
    </aside>
  );
}

export default memo(Sidebar);