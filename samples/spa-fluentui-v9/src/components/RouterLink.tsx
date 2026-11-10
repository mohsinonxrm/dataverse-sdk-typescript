import type { MouseEvent, ReactNode } from "react";
import { Link } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

/** A Fluent `Link` that navigates inside the app without reloading the page. */
export function RouterLink({ to, children }: { to: string; children: ReactNode }) {
  const navigate = useNavigate();
  const onClick = (event: MouseEvent) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    // React Router 7 types navigate() as void | Promise<void>; BrowserRouter returns void.
    void navigate(to);
  };
  return (
    <Link href={to} onClick={onClick}>
      {children}
    </Link>
  );
}
