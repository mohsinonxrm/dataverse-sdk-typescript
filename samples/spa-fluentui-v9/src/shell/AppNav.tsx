import type { MouseEvent } from "react";
import {
  Hamburger,
  makeStyles,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_GROUPS, ROUTES } from "../routes";

const useStyles = makeStyles({
  drawer: {
    // Below the sticky header.
    height: "auto",
    minHeight: 0,
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
});

interface AppNavProps {
  open: boolean;
  /** At narrow widths the navigation is an overlay that closes after a choice. */
  overlay: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppNav({ open, overlay, onOpenChange }: AppNavProps) {
  const styles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const go = (path: string) => (event: MouseEvent) => {
    // Let the browser open a new tab or window for modified clicks.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigate(path);
    if (overlay) onOpenChange(false);
  };

  return (
    <NavDrawer
      id="app-nav"
      className={styles.drawer}
      open={open}
      type={overlay ? "overlay" : "inline"}
      onOpenChange={(_, data) => onOpenChange(data.open)}
      selectedValue={location.pathname}
      aria-label="Scenarios"
      density="medium"
    >
      {overlay && (
        <NavDrawerHeader>
          <Tooltip content="Close navigation" relationship="label">
            <Hamburger onClick={() => onOpenChange(false)} />
          </Tooltip>
        </NavDrawerHeader>
      )}
      <NavDrawerBody>
        {NAV_GROUPS.map((group) => {
          const items = ROUTES.filter((r) => r.group === group);
          if (!items.length) return null;
          return (
            <div key={group} role="group" aria-label={group}>
              <NavSectionHeader>{group}</NavSectionHeader>
              {items.map((route) => (
                <NavItem
                  key={route.path}
                  value={route.path}
                  href={route.path}
                  icon={<route.icon />}
                  onClick={go(route.path)}
                >
                  {route.title}
                </NavItem>
              ))}
            </div>
          );
        })}
      </NavDrawerBody>
    </NavDrawer>
  );
}
