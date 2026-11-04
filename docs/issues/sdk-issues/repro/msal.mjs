import { run } from "./harness.mjs";
const P =
	"/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-auth-msal-browser";
const { MsalBrowserTokenProvider } = await import(`${P}/dist/index.js`);
const msal = await import(`${P}/node_modules/@azure/msal-browser/dist/msal-browser.mjs`)
	.catch(() => import(`${P}/node_modules/@azure/msal-browser/lib/msal-browser.mjs`))
	.catch(async () => import(`${P}/node_modules/@azure/msal-browser/dist/index.mjs`));
const { BrowserAuthError, InteractionRequiredAuthError } = msal;
const account = {
	homeAccountId: "h",
	environment: "login.microsoftonline.com",
	tenantId: "t",
	username: "user@contoso.com",
	localAccountId: "l",
};
function fakePca({ accounts = [], silent }) {
	const calls = [];
	return {
		calls,
		pca: {
			getAllAccounts: () => accounts,
			getActiveAccount: () => null,
			setActiveAccount: (a) => calls.push(["setActiveAccount", a?.username]),
			acquireTokenSilent: async (r) => {
				calls.push(["silent", r.account?.username ?? null]);
				return silent(r);
			},
			acquireTokenPopup: async (r) => {
				calls.push([
					"popup",
					{ account: r.account?.username ?? null, loginHint: r.loginHint ?? null },
				]);
				return { accessToken: "popup-token", account };
			},
			acquireTokenRedirect: async () => calls.push(["redirect"]),
		},
	};
}
await run(
	"M1. no signed-in account: silent throws BrowserAuthError(no_account) — falls back to interactive?",
	async () => {
		const { pca, calls } = fakePca({
			silent: () => {
				throw new BrowserAuthError(
					"no_account_error",
					"No account object provided to acquireTokenSilent",
				);
			},
		});
		const p = new MsalBrowserTokenProvider(pca, {
			scopes: ["https://org.crm.dynamics.com/user_impersonation"],
		});
		try {
			const t = await p.getToken();
			return { token: t, calls: JSON.stringify(calls) };
		} catch (e) {
			return { threw: `${e.constructor.name}: ${e.message}`, calls };
		}
	},
);
await run(
	"M2. interaction required for a signed-in user: popup request carries account/loginHint? active account set after?",
	async () => {
		const { pca, calls } = fakePca({
			accounts: [account],
			silent: () => {
				throw new InteractionRequiredAuthError("consent_required", "AADSTS65001");
			},
		});
		const p = new MsalBrowserTokenProvider(pca, {
			scopes: ["https://org.crm.dynamics.com/user_impersonation"],
		});
		const t = await p.getToken();
		return { token: t, calls: JSON.stringify(calls) };
	},
);
await run("M3. 5 concurrent getToken() calls needing interaction: how many popups?", async () => {
	const { pca, calls } = fakePca({
		accounts: [account],
		silent: () => {
			throw new InteractionRequiredAuthError("interaction_required", "x");
		},
	});
	const p = new MsalBrowserTokenProvider(pca, {
		scopes: ["https://org.crm.dynamics.com/user_impersonation"],
	});
	await Promise.all(Array.from({ length: 5 }, () => p.getToken()));
	return { popups: calls.filter((c) => c[0] === "popup").length };
});
await run("M4. multiple accounts, no active: which account is used silently?", async () => {
	const a2 = { ...account, username: "other@fabrikam.com", homeAccountId: "h2" };
	const { pca, calls } = fakePca({
		accounts: [a2, account],
		silent: () => ({ accessToken: "t" }),
	});
	await new MsalBrowserTokenProvider(pca, { scopes: ["x/.default"] }).getToken();
	return calls;
});
