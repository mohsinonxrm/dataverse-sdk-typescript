import {
  Avatar,
  Badge,
  Button,
  Caption1,
  Hamburger,
  makeStyles,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  ToggleButton,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import {
  Database20Regular,
  Globe20Regular,
  SignOut20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { useAuth } from "../auth/AuthProvider";
import { APP_NAME } from "../config";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useSdkContext } from "../sdk/SdkProvider";
import { useThemeMode } from "../theme/ThemeProvider";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingBlock: tokens.spacingVerticalS,
    paddingInline: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    position: "sticky",
    top: 0,
    zIndex: 1,
    minWidth: 0,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
    color: tokens.colorBrandForeground1,
  },
  title: {
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  spacer: { flex: 1 },
  env: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
    color: tokens.colorNeutralForeground2,
  },
  host: {
    fontFamily: tokens.fontFamilyMonospace,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  srOnly: {
    position: "absolute",
    width: tokens.strokeWidthThin,
    height: tokens.strokeWidthThin,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  user: { minWidth: 0, maxWidth: "16rem" },
  userName: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
});

interface AppHeaderProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

export function AppHeader({ navOpen, onToggleNav }: AppHeaderProps) {
  const styles = useStyles();
  const { signOut } = useAuth();
  const { session, connection } = useSdkContext();
  const { mode, toggle } = useThemeMode();
  const compact = useMediaQuery("(max-width: 47.99em)");
  const host = new URL(connection.environmentUrl).host;
  const dark = mode === "dark";

  return (
    <header className={styles.header}>
      <Tooltip content={navOpen ? "Hide navigation" : "Show navigation"} relationship="label">
        <Hamburger onClick={onToggleNav} aria-expanded={navOpen} aria-controls="app-nav" />
      </Tooltip>
      <div className={styles.brand}>
        <Database20Regular aria-hidden />
        <Text as="span" weight="semibold" size={400} className={styles.title}>
          {compact ? "SDK explorer" : APP_NAME}
        </Text>
      </div>
      <div className={styles.spacer} />
      <div className={styles.env} title={connection.environmentUrl}>
        <Globe20Regular aria-hidden />
        <Caption1 className={compact ? styles.srOnly : styles.host}>
          <span className={styles.srOnly}>Environment: </span>
          {host}
        </Caption1>
        {session.mode === "demo" && (
          <Badge appearance="tint" color="informative" shape="rounded">
            Demo
          </Badge>
        )}
      </div>
      <Tooltip
        content={dark ? "Use the light theme" : "Use the dark theme"}
        relationship="description"
      >
        <ToggleButton
          appearance="subtle"
          checked={dark}
          onClick={toggle}
          aria-label="Dark theme"
          icon={dark ? <WeatherSunny20Regular /> : <WeatherMoon20Regular />}
        />
      </Tooltip>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          <Button
            appearance="subtle"
            className={styles.user}
            // The initials are decoration. The name comes from the text, so it contains what is
            // shown (WCAG 2.5.3): "Account: <name>", with the name hidden on narrow screens.
            icon={<Avatar name={session.user.name} size={24} color="colorful" aria-hidden />}
          >
            <span className={styles.srOnly}>Account: </span>
            <span className={compact ? styles.srOnly : styles.userName}>{session.user.name}</span>
          </Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>{session.user.username}</MenuGroupHeader>
              <MenuItem disabled icon={<Globe20Regular />}>
                {host}
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem icon={<SignOut20Regular />} onClick={() => void signOut()}>
              Sign out
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </header>
  );
}
