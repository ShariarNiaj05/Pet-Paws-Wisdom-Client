import { ScrollText, History, Home } from "lucide-react";
// import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CollapseItems } from "./collapse-items";
import { useSidebarContext } from "../../layout/layout-context";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0 bg-primary">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        {/* <div className={Sidebar.Header()}>
          {" "}
          <Link className="flex" href="/">
            <Cat />
            <p className="font-bold text-inherit px-4">Pet Paws Wisdom</p>
          </Link>
        </div> */}

        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/dashboard/new-post"}
                title="New Post"
                icon={<ScrollText />}
                href="/dashboard/new-post"
              />

              <CollapseItems
                icon={<History />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Rent history"
              />
            </SidebarMenu>

            {/* <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<Home />}
              />
            </SidebarMenu> */}
          </div>
        </div>
      </div>
    </aside>
  );
};
