import { DiscoveryClient } from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-discovery/dist/index.js";
const calls = [];
const scopesSeen = [];
// v2.0 Instance shape per Microsoft Learn "Discover user organizations" sample (State is an integer, Url/ApiUrl at top level)
const v2Instance = {
	Id: "1",
	UniqueName: "orgabc",
	UrlName: "orgabc",
	FriendlyName: "Org ABC",
	State: 0,
	Version: "9.2.25101.00000",
	Url: "https://orgabc.crm.dynamics.com",
	ApiUrl: "https://orgabc.api.crm.dynamics.com",
	LastUpdated: "2026-01-01T00:00:00Z",
};
let status = 200;
globalThis.fetch = async (url, init) => {
	calls.push({ url: String(url), headers: init?.headers });
	return status === 200
		? new Response(JSON.stringify({ value: [v2Instance] }), {
				status: 200,
				headers: { "content-type": "application/json" },
			})
		: new Response(JSON.stringify({ error: { code: "x", message: "throttled" } }), {
				status,
				headers: { "retry-after": "1" },
			});
};
const tokenProvider = {
	getToken: async (scopes) => {
		scopesSeen.push(scopes);
		return "tok";
	},
};
// GCC High base URL override
const d = new DiscoveryClient(
	tokenProvider,
	"https://globaldisco.crm.microsoftdynamics.us/api/discovery/v2.0",
);
const orgs = await d.getEnabledOrganizations();
console.log("URL      :", decodeURIComponent(calls[0].url));
console.log("scopes   :", JSON.stringify(scopesSeen[0]), "(base URL was GCC High)");
const o = orgs[0];
console.log(
	"org.Endpoints?.WebApiUrl =",
	o.Endpoints?.WebApiUrl,
	"| org.Geo =",
	o.Geo,
	"| org.ApiUrl (not in type) =",
	o.ApiUrl,
	"| typeof State =",
	typeof o.State,
);
calls.length = 0;
await d.listOrganizations({ select: ["UniqueName", "Url"], filter: "UniqueName eq 'a&b'" });
console.log("select/filter URL raw:", calls[0].url);
calls.length = 0;
await d.getOrganization("o'brien");
console.log("getOrganization quote:", decodeURIComponent(calls[0].url));
status = 429;
calls.length = 0;
try {
	await d.listOrganizations();
} catch (e) {
	console.log(
		"429 ->",
		e.constructor.name,
		"| status prop:",
		e.status,
		"| attempts:",
		calls.length,
		"|",
		e.message,
	);
}
console.log(
	"constructor arity:",
	DiscoveryClient.length,
	"| accepts fetchProvider? no (signature: tokenProvider, baseUrl?)",
);
