export interface SidebarMetadata {
  path: string;
  title: string;
  iconType: string;
  icon: string;
  groupTitle: boolean;
  role: string[];
  submenu: SidebarMetadata[];
}
