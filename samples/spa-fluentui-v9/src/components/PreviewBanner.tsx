import { Link, MessageBar, MessageBarBody, MessageBarTitle } from "@fluentui/react-components";
import { isPreview, SITE_URL } from "../preview";

/**
 * On a pull request's preview deployment, says so: sign-in may not work there, demo mode does.
 * Nothing elsewhere (production, local runs, tests).
 */
export function PreviewBanner({ className }: { className?: string }) {
  if (!isPreview()) return null;
  return (
    <MessageBar intent="warning" layout="multiline" className={className}>
      <MessageBarBody>
        <MessageBarTitle>Preview — sign-in may not work</MessageBarTitle>
        This is a preview of a pull request. Its address isn&apos;t a redirect URI of the
        site&apos;s app registration, so use demo mode here, or the{" "}
        <Link href={SITE_URL} inline>
          production site
        </Link>{" "}
        to sign in.
      </MessageBarBody>
    </MessageBar>
  );
}
