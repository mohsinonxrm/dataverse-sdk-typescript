import { Suspense, useEffect, useRef, useState } from "react";
import {
  Body1,
  Button,
  makeStyles,
  Skeleton,
  SkeletonItem,
  Title2,
  Toaster,
  tokens,
} from "@fluentui/react-components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { TOASTER_ID } from "../components/toaster";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ROUTES } from "../routes";
import { MEDIA_SMALL, MEDIUM, PAGE_MAX_WIDTH } from "../theme/layout";
import { AppHeader } from "./AppHeader";
import { AppNav } from "./AppNav";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  skip: {
    position: "absolute",
    insetInlineStart: tokens.spacingHorizontalS,
    top: `calc(-1 * ${tokens.spacingVerticalXXXL} * 2)`,
    zIndex: 2,
    padding: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorBrandForegroundLink,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
    ":focus": { top: tokens.spacingVerticalS },
  },
  body: { display: "flex", flex: 1, minHeight: 0 },
  main: {
    flex: 1,
    minWidth: 0,
    overflowY: "auto",
    paddingBlock: tokens.spacingVerticalXXL,
    paddingInline: tokens.spacingHorizontalXXL,
    [MEDIA_SMALL]: {
      paddingBlock: tokens.spacingVerticalL,
      paddingInline: tokens.spacingHorizontalM,
    },
    ":focus-visible": { outline: "none" },
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    maxWidth: PAGE_MAX_WIDTH,
    marginInline: "auto",
  },
  notFound: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    alignItems: "flex-start",
  },
});

function PageLoading() {
  const styles = useStyles();
  return (
    <Skeleton className={styles.loading} aria-label="Loading the page">
      <SkeletonItem size={32} />
      <SkeletonItem size={16} />
      <SkeletonItem size={128} />
      <SkeletonItem size={128} />
    </Skeleton>
  );
}

function NotFound() {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <Title2 as="h1">Page not found</Title2>
      <Body1>There is no scenario at this address.</Body1>
      {/* One control: a button inside a link would be two tab stops announced as one. */}
      <Button appearance="primary" onClick={() => void navigate("/")}>
        Go to the overview
      </Button>
    </div>
  );
}

/** Header, navigation and the current page, which is loaded on demand. */
export default function AppShell() {
  const styles = useStyles();
  const narrow = useMediaQuery(MEDIUM);
  const [navOpen, setNavOpen] = useState(!narrow);
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => setNavOpen(!narrow), [narrow]);

  // After navigating, move focus to the new page so keyboard and screen reader users start there.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    main.current?.focus();
    main.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className={styles.root}>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <AppHeader navOpen={navOpen} onToggleNav={() => setNavOpen((o) => !o)} />
      <div className={styles.body}>
        <AppNav open={navOpen} overlay={narrow} onOpenChange={setNavOpen} />
        <main id="main" ref={main} tabIndex={-1} className={styles.main}>
          <ErrorBoundary key={location.pathname}>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                {ROUTES.map((route) => (
                  <Route key={route.path} path={route.path} element={<route.component />} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
      <Toaster toasterId={TOASTER_ID} position="bottom-end" pauseOnHover pauseOnWindowBlur />
    </div>
  );
}
