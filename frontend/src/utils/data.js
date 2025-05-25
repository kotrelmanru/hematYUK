import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    ID: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    ID: "02",
    label: "Pendapatan",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    ID: "03",
    label: "Pengeluaran",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    ID: "06",
    label: "Keluar",
    icon: LuLogOut,
    path: "/logout",
  },
];