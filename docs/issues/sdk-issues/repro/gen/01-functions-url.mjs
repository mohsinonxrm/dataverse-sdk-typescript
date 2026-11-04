import * as F from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-functions/dist/index.js";
const base = "https://org.crm.dynamics.com/api/data/v9.2";
const show = (label, fn) => {
	const r = fn.toRequestInformation(base);
	const u = new URL(r.url);
	console.log(`\n[${label}] ${r.method}\n  raw : ${r.url}`);
	for (const [k, v] of u.searchParams) console.log(`  decoded ${k} = ${v}`);
};
// 1. single-quote escaping
show(
	"FetchXmlToQueryExpression",
	new F.FetchXmlToQueryExpressionFunction(
		`<fetch><entity name='account'><attribute name='name'/><filter><condition attribute='name' operator='eq' value='O''Brien &amp; Co+1'/></filter></entity></fetch>`,
	),
);
show(
	"ValidateFetchXmlExpression",
	new F.ValidateFetchXmlExpressionFunction(`<fetch><entity name='account'/></fetch>`),
);
// 2. enum
console.log("\nEntityFilters exported at runtime?", "EntityFilters" in F);
show(
	"RetrieveEntity (enum=1, guid)",
	new F.RetrieveEntityFunction(1, "account", "00000000-0000-0000-0000-000000000000", false),
);
show(
	'RetrieveEntity (enum="Entity")',
	new F.RetrieveEntityFunction(
		"Entity",
		"account",
		"00000000-0000-0000-0000-000000000000",
		false,
	),
);
show("RetrieveAllEntities (enum=1)", new F.RetrieveAllEntitiesFunction(1, false));
// 3. collection
show("RetrieveTotalRecordCount", new F.RetrieveTotalRecordCountFunction(["account", "contact"]));
// 4. DateTimeOffset
show(
	"LocalTimeFromUtcTime (DateTimeOffset)",
	new F.LocalTimeFromUtcTimeFunction(85, "2026-01-01T00:00:00Z"),
);
// 5. EntityReference w/o logicalName (interface allows), and with createEntityReference
show(
	"RetrievePrincipalAccess ref w/o logicalName",
	new F.RetrievePrincipalAccessFunction("11111111-1111-1111-1111-111111111111", {
		"@odata.type": "Microsoft.Dynamics.CRM.account",
		id: "22222222-2222-2222-2222-222222222222",
	}),
);
show(
	"RetrievePrincipalAccess createEntityReference(savedquery)",
	new F.RetrievePrincipalAccessFunction("1", F.createEntityReference("savedquery", "3")),
);
show(
	"createEntityReference(userquery)",
	new F.RetrievePrincipalAccessFunction("1", F.createEntityReference("userquery", "3")),
);
// 6. null
show("FetchXmlToQueryExpression(null)", new F.FetchXmlToQueryExpressionFunction(null));
// 7. no-param
show("WhoAmI", new F.WhoAmIFunction());
show("RetrieveVersion", new F.RetrieveVersionFunction());
