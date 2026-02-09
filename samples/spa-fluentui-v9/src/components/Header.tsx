import { useMsal } from "@azure/msal-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  makeStyles,
  tokens,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Avatar,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";
import {
  HomeRegular,
  BuildingRegular,
  AddRegular,
  PersonRegular,
  SignOutRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
  BookRegular,
  CodeRegular,
  DatabaseRegular,
  CloudRegular,
  GaugeRegular,
  ShieldCheckmarkRegular,
} from "@fluentui/react-icons";
import { useTheme } from "../hooks/useTheme";

const useStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "0 24px",
    boxShadow: tokens.shadow4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
  },
  brand: {
    fontSize: "20px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  nav: {
    display: "flex",
    gap: "8px",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  userName: {
    fontSize: "14px",
    fontWeight: 500,
  },
});

export default function Header() {
  const styles = useStyles();
  const { instance, accounts } = useMsal();
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const user = accounts[0];

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/login",
    });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <BuildingRegular fontSize={24} />
        <span>Dataverse SDK Showcase</span>
      </div>

      <Toolbar className={styles.nav}>
        <ToolbarButton
          icon={<HomeRegular />}
          appearance={isActive("/dashboard") ? "primary" : "subtle"}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </ToolbarButton>
        <ToolbarButton
          icon={<BuildingRegular />}
          appearance={isActive("/accounts") ? "primary" : "subtle"}
          onClick={() => navigate("/accounts")}
        >
          Accounts
        </ToolbarButton>
        <ToolbarButton
          icon={<AddRegular />}
          appearance={isActive("/accounts/new") ? "primary" : "subtle"}
          onClick={() => navigate("/accounts/new")}
        >
          New Account
        </ToolbarButton>

        <ToolbarDivider />

        {/* Scenarios Menu */}
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <ToolbarButton
              icon={<BookRegular />}
              appearance={location.pathname.startsWith("/scenarios") ? "primary" : "subtle"}
            >
              SDK Scenarios
            </ToolbarButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuGroup>
                <MenuItem icon={<CodeRegular />} onClick={() => navigate("/scenarios/crud")}>
                  CRUD Operations
                </MenuItem>
                <MenuItem
                  icon={<DatabaseRegular />}
                  onClick={() => navigate("/scenarios/querying")}
                >
                  Advanced Querying
                </MenuItem>
                <MenuItem icon={<DatabaseRegular />} onClick={() => navigate("/scenarios/bulk")}>
                  Bulk Operations
                </MenuItem>
                <MenuItem icon={<DatabaseRegular />} onClick={() => navigate("/scenarios/batch")}>
                  Batch Operations
                </MenuItem>
                <MenuItem
                  icon={<DatabaseRegular />}
                  onClick={() => navigate("/scenarios/relationships")}
                >
                  Relationships
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem
                  icon={<DatabaseRegular />}
                  onClick={() => navigate("/scenarios/metadata")}
                >
                  Metadata Explorer
                </MenuItem>
                <MenuItem icon={<DatabaseRegular />} onClick={() => navigate("/scenarios/files")}>
                  File Operations
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem icon={<CodeRegular />} onClick={() => navigate("/scenarios/actions")}>
                  Actions & Functions
                </MenuItem>
                <MenuItem icon={<CodeRegular />} onClick={() => navigate("/scenarios/messages")}>
                  SDK Messages
                </MenuItem>
                <MenuItem icon={<CloudRegular />} onClick={() => navigate("/scenarios/discovery")}>
                  Discovery Service
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem
                  icon={<GaugeRegular />}
                  onClick={() => navigate("/scenarios/observability")}
                >
                  Observability
                </MenuItem>
                <MenuItem
                  icon={<ShieldCheckmarkRegular />}
                  onClick={() => navigate("/scenarios/typesafety")}
                >
                  Type Safety
                </MenuItem>
                <MenuItem icon={<BookRegular />} onClick={() => navigate("/scenarios/reference")}>
                  API Reference
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </MenuPopover>
        </Menu>
      </Toolbar>

      <div className={styles.userSection}>
        <ToolbarButton
          appearance="subtle"
          icon={themeMode === "dark" ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
          onClick={toggleTheme}
          title={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
        />
        <ToolbarDivider />
        <span className={styles.userName}>{user?.name || "User"}</span>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="subtle"
              icon={<Avatar name={user?.name} size={32} color="colorful" />}
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem icon={<PersonRegular />}>{user?.username}</MenuItem>
              <MenuItem icon={<SignOutRegular />} onClick={handleLogout}>
                Sign Out
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </header>
  );
}
