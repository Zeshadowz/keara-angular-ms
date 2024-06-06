import { SidebarMetadata } from "./sidebar.metadata";

export const SIDEBAR_ITEMS: SidebarMetadata[] = [
  {
    path: '',
    title: 'Main',
    iconType: '',
    icon: '',
    groupTitle: true,
    role: ['Admin', 'User', 'Guest'],
    submenu: []
  },
  {
    path: 'home',
    title: 'Home',
    iconType: 'material-icons-outlined',
    icon: 'home',
    groupTitle: false,
    role: ['Admin'],
    submenu: []
  },
  {
    path: 'employees',
    title: 'Employees',
    iconType: 'material-icons-outlined',
    icon: 'person',
    groupTitle: false,
    role: ['Admin'],
    submenu: []
  }, {
    path: 'guest',
    title: 'Test',
    iconType: 'material-icons-outlined',
    icon: 'person',
    groupTitle: false,
    role: ['Guest'],
    submenu: []
  },
]
