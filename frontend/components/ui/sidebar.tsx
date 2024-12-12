"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-sidebar-background text-sidebar-foreground w-[300px] flex-shrink-0 transition-all duration-300",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <>
      {/* White strip container */}
      <div
        className={cn(
          "h-10 px-7 flex items-center justify-between bg-sidebar-background text-sidebar-foreground md:hidden",
          className
        )}
        {...props}
      >
        {/* White strip text or branding */}
        <span className="text-lg font-semibold text-sidebar-foreground">
          
        </span>
      </div>

      {/* Always visible icons in a vertical strip */}
      <div
        className="fixed top-0 left-0 h-full bg-sidebar-background text-sidebar-foreground flex flex-col items-center p-4 space-y-4 z-[50] md:hidden"
        {...props}
      >
        {children}
      </div>
    </>
  );
};


export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2 transition-all duration-150",
        className
      )}
      {...props}
    >
      {/* Icon is always visible */}
      <motion.div
        animate={{
          scale: 1, // Keep icons at a consistent size
          opacity: 1, // Icons are always visible
        }}
        className="text-sidebar-foreground flex-shrink-0"
      >
        {link.icon}
      </motion.div>

      {/* Text is hidden when the sidebar is closed */}
      <motion.span
        animate={{
          opacity: animate && open ? 1 : 0,
        }}
        className={cn(
          "text-sidebar-foreground text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0",
          "hidden md:inline-block" // Text remains hidden on small screens
        )}
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
