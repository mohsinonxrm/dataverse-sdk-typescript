/**
 * @fileoverview A fake IPublicClientApplication for unit tests.
 *
 * Only the members the provider uses are implemented, as vitest mocks. Tests set return values
 * with `mockResolvedValue` / `mockRejectedValue` and assert on the recorded calls.
 */

import { vi, type Mock } from "vitest";
import type { IPublicClientApplication } from "@azure/msal-browser";

export interface FakePca {
  acquireTokenSilent: Mock;
  acquireTokenPopup: Mock;
  acquireTokenRedirect: Mock;
  getAllAccounts: Mock;
  getActiveAccount: Mock;
  setActiveAccount: Mock;
  logoutPopup: Mock;
  logoutRedirect: Mock;
  initialize: Mock;
  handleRedirectPromise: Mock;
  getConfiguration: Mock;
}

export function createFakePca(): FakePca {
  return {
    acquireTokenSilent: vi.fn(),
    acquireTokenPopup: vi.fn(),
    acquireTokenRedirect: vi.fn(),
    getAllAccounts: vi.fn().mockReturnValue([]),
    getActiveAccount: vi.fn().mockReturnValue(null),
    setActiveAccount: vi.fn(),
    logoutPopup: vi.fn(),
    logoutRedirect: vi.fn(),
    initialize: vi.fn().mockResolvedValue(undefined),
    handleRedirectPromise: vi.fn().mockResolvedValue(null),
    getConfiguration: vi
      .fn()
      .mockReturnValue({ auth: { authority: "https://login.microsoftonline.com/common" } }),
  };
}

/** The fake, typed as the MSAL interface the provider accepts. */
export function asPca(fake: FakePca): IPublicClientApplication {
  return fake as unknown as IPublicClientApplication;
}
