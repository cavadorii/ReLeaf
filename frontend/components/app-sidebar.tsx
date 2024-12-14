import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"; // Import new sidebar components
import {
  Home,
  Search,
  LetterText,
  DollarSign,
  Check,
  ReceiptText,
  Bot,
  User,
} from "lucide-react";

const items = [
  { title: "Home", url: "/plantMe", icon: <Home /> },
  { title: "Events", url: "/events", icon: <ReceiptText /> },
  { title: "Profile", url: "/profile", icon: <User /> },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarBody>
        {items.map((item) => (
          <SidebarLink key={item.title} link={{ label: item.title, href: item.url, icon: item.icon }} />
        ))}
      </SidebarBody>
    </Sidebar>
  );
}
