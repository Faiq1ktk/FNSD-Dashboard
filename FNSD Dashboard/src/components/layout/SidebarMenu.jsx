import { sidebarMenuItems } from "../../data/sidebarData";

function SidebarMenu({ activeMenu, onMenuSelect }) {
  return (
    <div className="sidebar-menu">
      {sidebarMenuItems.map((item) => {
        const isActive = activeMenu === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`nav-item-link ${isActive ? "active" : ""}`}
            onClick={() => onMenuSelect(item.id)}
            title={item.label}
            aria-label={item.label}
          >
            <i className={item.iconClass}></i>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default SidebarMenu;