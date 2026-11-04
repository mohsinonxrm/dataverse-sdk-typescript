import { DataverseClient } from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-core/dist/index.js";
import * as F from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-functions/dist/index.js";
let next;
const calls = [];
const fetchProvider = {
	fetch: async (url, init) => {
		calls.push({ url: String(url), method: init?.method });
		return new Response(JSON.stringify(next), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	},
};
const client = new DataverseClient({
	baseUrl: "https://org.crm.dynamics.com",
	fetchProvider,
	logger: { debug() {}, info() {}, warn() {}, error() {} },
});
const ex = async (label, fn, body) => {
	next = body;
	calls.length = 0;
	const r = await client.execute(fn);
	console.log(
		`[${label}] ${calls[0].method} ${decodeURIComponent(calls[0].url).slice(0, 220)}\n  parsed=${JSON.stringify(r).slice(0, 200)}`,
	);
};
await ex("WhoAmI", new F.WhoAmIFunction(), {
	"@odata.context": "x",
	BusinessUnitId: "b",
	UserId: "u",
	OrganizationId: "o",
});
await ex("RetrieveVersion", new F.RetrieveVersionFunction(), { Version: "9.2.1" });
await ex(
	"RetrieveTotalRecordCount",
	new F.RetrieveTotalRecordCountFunction(["account", "contact"]),
	{
		EntityRecordCountCollection: {
			Count: 2,
			IsReadOnly: false,
			Keys: ["account", "contact"],
			Values: [19, 3],
		},
	},
);
await ex(
	"FetchXmlToQueryExpression",
	new F.FetchXmlToQueryExpressionFunction("<fetch><entity name='account'/></fetch>"),
	{ Query: { EntityName: "account" } },
);
await ex(
	"ValidateFetchXmlExpression",
	new F.ValidateFetchXmlExpressionFunction("<fetch><entity name='account'/></fetch>"),
	{ ValidationResults: { Messages: [] } },
);
// long fetch through execute (does execute() apply the 260 check? -> no)
const longFetch = `<fetch><entity name='account'>${Array.from({ length: 30 }, (_, i) => `<attribute name='a${i}'/>`).join("")}</entity></fetch>`;
await ex("FetchXmlToQueryExpression long", new F.FetchXmlToQueryExpressionFunction(longFetch), {
	Query: {},
});
await ex(
	"RetrieveMetadataChanges (enum + guid)",
	new F.RetrieveMetadataChangesFunction(
		{ Properties: { AllProperties: false, PropertyNames: ["LogicalName"] } },
		0,
		undefined,
		"00000000-0000-0000-0000-000000000000",
		false,
	),
	{},
);
// RetrieveTotalRecordCount via the fluent builder (the path apps often use) -> 260-char check counts query string
calls.length = 0;
try {
	await client
		.api(
			`/RetrieveTotalRecordCount(EntityNames=@p1)?@p1=${encodeURIComponent(JSON.stringify(["account"]))}`,
		)
		.get();
	console.log("[api() with alias] ", calls[0]?.url);
} catch (e) {
	console.log("[api() with alias] THREW", e.message);
}
