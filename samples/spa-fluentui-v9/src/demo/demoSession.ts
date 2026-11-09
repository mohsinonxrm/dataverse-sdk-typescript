import type { AuthSession } from "../auth/session";
import { DEMO_ENVIRONMENT_URL } from "../config";
import { createFakeDataverse } from "./fakeDataverse";
import { DEMO_USER } from "./store";

/**
 * A session against the in-browser demo environment. The SDK clients are real; only `fetch` is
 * replaced, so every request still goes through the SDK's pipeline and shows up in the inspector.
 */
export function createDemoSession(): AuthSession {
  return {
    mode: "demo",
    user: { name: DEMO_USER.fullname, username: DEMO_USER.internalemailaddress },
    accountId: "demo",
    environmentUrl: DEMO_ENVIRONMENT_URL,
    tokenProvider: { getToken: () => Promise.resolve("demo-token") },
    scopesFor: (url) => [`${new URL(url).origin}/.default`],
    fetchProvider: createFakeDataverse(),
    signOut: () => Promise.resolve(),
  };
}
