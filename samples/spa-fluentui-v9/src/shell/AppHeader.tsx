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
  Subtitle2,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import {
  ArrowSwapRegular,
  Database20Regular,
  Globe20Regular,
  GlobeRegular,
  SignOutRegular,
} from "@fluentui/react-icons";
import { useAuth } from "../auth/AuthProvider";
import { APP_NAME } from "../config";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useSdkContext } from "../sdk/SdkProvider";
import { SMALL } from "../theme/layout";
import { useCommonStyles } from "../theme/styles";
import { ThemeToggle } from "../theme/ThemeToggle";

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
  user: { minWidth: 0, maxWidth: "16rem" },
  userName: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
});

interface AppHeaderProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

export function AppHeader({ navOpen, onToggleNav }: AppHeaderProps) {
  const styles = useStyles();
  const common = useCommonStyles();
  const { signOut, switchEnvironment } = useAuth();
  const { session, connection } = useSdkContext();
  const compact = useMediaQuery(SMALL);
  const host = new URL(connection.environmentUrl).host;

  return (
    <header className={styles.header}>
      <Tooltip content={navOpen ? "Hide navigation" : "Show navigation"} relationship="label">
        <Hamburger onClick={onToggleNav} aria-expanded={navOpen} aria-controls="app-nav" />
      </Tooltip>
      <div className={styles.brand}>
        <Database20Regular aria-hidden />
        <Subtitle2 as="span" className={styles.title}>
          {compact ? "SDK explorer" : APP_NAME}
        </Subtitle2>
      </div>
      <div className={styles.spacer} />
      <div className={styles.env} title={connection.environmentUrl}>
        <Globe20Regular aria-hidden />
        <Caption1 className={compact ? common.visuallyHidden : styles.host}>
          <span className={common.visuallyHidden}>Environment: </span>
          {host}
        </Caption1>
        {session.mode === "demo" && (
          <Badge appearance="tint" color="informative" shape="rounded">
            Demo
          </Badge>
        )}
      </div>
      <ThemeToggle />
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          <Button
            appearance="subtle"
            className={styles.user}
            // The initials are decoration. The name comes from the text, so it contains what is
            // shown (WCAG 2.5.3): "Account: <name>", with the name hidden on narrow screens.
            icon={<Avatar name={session.user.name} size={24} color="colorful" aria-hidden />}
          >
            <span className={common.visuallyHidden}>Account: </span>
            <span className={compact ? common.visuallyHidden : styles.userName}>
              {session.user.name}
            </span>
          </Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>{session.user.username}</MenuGroupHeader>
              <MenuItem disabled icon={<GlobeRegular />}>
                {host}
              </MenuItem>
              <MenuItem icon={<ArrowSwapRegular />} onClick={switchEnvironment}>
                Switch environment
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem icon={<SignOutRegular />} onClick={() => void signOut()}>
              Sign out
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </header>
  );
}
