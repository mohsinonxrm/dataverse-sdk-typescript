import { Fragment } from "react";
import type { MouseEvent } from "react";
import {
  Hamburger,
  makeStyles,
  NavDrawer,
  NavDrawerBody,
  NavDivider,
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

const GROUPS = NAV_GROUPS.map((group) => ({
  group,
  routes: ROUTES.filter((r) => r.group === group),
})).filter((g) => g.routes.length > 0);

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
    void navigate(path); // void | Promise<void> in React Router 7; void with BrowserRouter
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
        {GROUPS.map(({ group, routes }, index) => {
          const items = routes.map((route) => (
            <NavItem
              key={route.path}
              value={route.path}
              href={route.path}
              icon={<route.icon />}
              onClick={go(route.path)}
            >
              {route.title}
            </NavItem>
          ));
          // A section header names a group of pages; a page on its own is named by its item.
          // Dividers set the sections apart; pages on their own run together.
          const section = routes.length > 1;
          const divider = index > 0 && (section || (GROUPS[index - 1]?.routes.length ?? 0) > 1);
          return (
            <Fragment key={group}>
              {divider && <NavDivider />}
              {section ? (
                <div role="group" aria-label={group}>
                  <NavSectionHeader>{group}</NavSectionHeader>
                  {items}
                </div>
              ) : (
                items
              )}
            </Fragment>
          );
        })}
      </NavDrawerBody>
    </NavDrawer>
  );
}
