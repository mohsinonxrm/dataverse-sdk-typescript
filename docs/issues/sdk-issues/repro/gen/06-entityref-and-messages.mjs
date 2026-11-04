import * as A from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-actions/dist/index.js";
import * as M from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-messages/dist/index.js";
const base = "https://org.crm.dynamics.com/api/data/v9.2";
const json = (o) =>
	new Response(JSON.stringify(o), {
		status: 200,
		headers: { "content-type": "application/json" },
	});
// Entity-typed action parameter built with the SDK's own helper
const ga = new A.GrantAccessAction(A.createEntityReference("account", "a1"), {
	Principal: A.createEntityReference("systemuser", "u1"),
	AccessMask: "ReadAccess",
});
console.log("GrantAccess body:", JSON.stringify(ga.toRequestInformation(base).body));
console.log("email ref:", JSON.stringify(A.createEntityReference("email", "e1")));
// messages: response parsing
const q = new M.QueryExpressionToFetchXmlRequest({
	"@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
	EntityName: "account",
});
const r = await q.parseResponse(
	json({
		"@odata.context": "...#Microsoft.Dynamics.CRM.QueryExpressionToFetchXmlResponse",
		FetchXml: '<fetch><entity name="account"/></fetch>',
	}),
);
console.log("QueryExpressionToFetchXmlResponse.result =", r.result, "| r.FetchXml =", r.FetchXml);
const ew = await new M.ExecuteWorkflowRequest("w", "r").parseResponse(
	json({ asyncoperationid: "aaa" }),
);
console.log("ExecuteWorkflowResponse.result =", ew.result);
for (const [cls, args] of [
	["CalculateActualValueOpportunityRequest", ["o1"]],
	["DistributeCampaignActivityRequest", ["c1"]],
	["ValidateSavedQueryRequest", ["<fetch/>", 0]],
]) {
	if (!M[cls]) {
		console.log(cls, "not exported");
		continue;
	}
	console.log(cls, "->", new M[cls](...args).toRequestInformation(base).url);
}
