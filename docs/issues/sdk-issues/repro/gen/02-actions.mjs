import * as A from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-actions/dist/index.js";
const base = "https://org.crm.dynamics.com/api/data/v9.2";
const show = (label, a) => {
	const r = a.toRequestInformation(base);
	console.log(
		`\n[${label}] ${r.method} ${r.url}\n  headers=${JSON.stringify(r.headers)}\n  body=${JSON.stringify(r.body)}`,
	);
};
const json = (o) =>
	new Response(JSON.stringify(o), {
		status: 200,
		headers: { "content-type": "application/json" },
	});
console.log("ExportToExcelAction exported?", "ExportToExcelAction" in A);
show(
	"ValidateSavedQuery",
	new A.ValidateSavedQueryAction(`<fetch><entity name='account'/></fetch>`, 0),
);
show("CreateMultiple", new A.CreateMultipleAction([{ name: "x" }]));
show(
	"AddSolutionComponent",
	new A.AddSolutionComponentAction("id", 26, "sol", false, true, undefined),
);
show(
	"PublishXml",
	new A.PublishXmlAction(
		"<importexportxml><entities><entity>account</entity></entities></importexportxml>",
	),
);
show(
	"BulkDelete",
	new A.BulkDeleteAction(
		[{ EntityName: "account", ColumnSet: { AllColumns: true } }],
		"job",
		false,
		[],
		[],
		"",
		"2026-01-01T00:00:00Z",
		"00000000-0000-0000-0000-000000000000",
		false,
	),
);
show("ExecuteWorkflow", new A.ExecuteWorkflowAction("wfid", "recid"));
show(
	"WinOpportunity",
	new A.WinOpportunityAction(
		{ subject: "Won", "opportunityid@odata.bind": "/opportunities(1)" },
		undefined,
		3,
	),
);
show(
	"QueryExpressionToFetchXml",
	new A.QueryExpressionToFetchXmlAction({
		EntityName: "account",
		ColumnSet: { AllColumns: true },
	}),
);
// parseResponse
console.log(
	"\nExecuteWorkflow.parseResponse ->",
	await new A.ExecuteWorkflowAction("w", "r").parseResponse(
		json({ "@odata.context": "$metadata#asyncoperations/$entity", asyncoperationid: "aaa" }),
	),
);
console.log(
	"QueryExpressionToFetchXml.parseResponse ->",
	await new A.QueryExpressionToFetchXmlAction({}).parseResponse(
		json({
			"@odata.context": "$metadata#Microsoft.Dynamics.CRM.QueryExpressionToFetchXmlResponse",
			FetchXml: "<fetch/>",
		}),
	),
);
console.log(
	"BulkDelete.parseResponse ->",
	await new A.BulkDeleteAction().parseResponse(json({ JobId: "j" })),
);
try {
	console.log(
		"AddSolutionComponent.parseResponse ->",
		await new A.AddSolutionComponentAction().parseResponse(json({ id: "x" })),
	);
} catch (e) {
	console.log("err", e.message);
}
