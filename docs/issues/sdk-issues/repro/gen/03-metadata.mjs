import { DataverseClient } from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-core/dist/index.js";
import { MetadataClient } from "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages/dataverse-sdk-metadata/dist/index.js";
const calls = [];
const fetchProvider = {
	fetch: async (url, init) => {
		calls.push({
			url: String(url),
			method: init?.method,
			body: init?.body,
			headers: init?.headers,
		});
		return new Response(JSON.stringify({ value: [] }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	},
};
const client = new DataverseClient({
	baseUrl: "https://org.crm.dynamics.com",
	fetchProvider,
	retry: { maxRetries: 0 },
});
const md = new MetadataClient(client);
const run = async (label, fn) => {
	calls.length = 0;
	try {
		await fn();
		const c = calls[0];
		console.log(
			`\n[${label}] ${c?.method} ${c?.url ? decodeURIComponent(c.url) : "(no request)"}${c?.body ? "\n  body=" + c.body : ""}`,
		);
	} catch (e) {
		console.log(`\n[${label}] THREW ${e.name}: ${e.message}`);
	}
};
await run("getEntityDefinitions", () =>
	md.getEntityDefinitions({
		select: ["LogicalName", "EntitySetName", "DisplayName"],
		filter: "IsValidForAdvancedFind eq true",
	}),
);
await run("getEntityDefinition", () =>
	md.getEntityDefinition("account", { select: ["LogicalName", "EntitySetName"] }),
);
await run("getAttributeDefinitions IsValidForAdvancedFind", () =>
	md.getAttributeDefinitions("account", {
		select: ["LogicalName", "AttributeType", "DisplayName"],
		filter: "IsValidForAdvancedFind/Value eq true",
	}),
);
const longSelect = [
	"LogicalName",
	"SchemaName",
	"AttributeType",
	"AttributeTypeName",
	"DisplayName",
	"Description",
	"IsValidForAdvancedFind",
	"IsValidForRead",
	"IsValidForGrid",
	"IsCustomAttribute",
	"IsPrimaryId",
	"IsPrimaryName",
	"IsLogical",
	"AttributeOf",
	"RequiredLevel",
	"IsFilterable",
	"IsSearchable",
	"IsRetrievable",
	"SourceType",
];
console.log("\nlong $select chars:", longSelect.join(",").length);
await run("getAttributeDefinitions long select", () =>
	md.getAttributeDefinitions("account", {
		select: longSelect,
		filter: "IsValidForAdvancedFind/Value eq true",
	}),
);
await run("getAttributeDefinitions short select + 300-char filter", () =>
	md.getAttributeDefinitions("account", {
		select: ["LogicalName"],
		filter: Array.from({ length: 8 }, (_, i) => `LogicalName eq 'new_field_${i}'`).join(" or "),
	}),
);
await run("getEntityDefinitions expand (OneToMany via expand)", () =>
	md.getEntityDefinitions({ select: ["LogicalName"], expand: "Attributes($select=LogicalName)" }),
);
await run("getOneToManyRelationships", () =>
	md.getOneToManyRelationships("account", {
		select: ["SchemaName", "ReferencingEntity", "ReferencingAttribute"],
	}),
);
await run("getManyToOneRelationships", () =>
	md.getManyToOneRelationships("account", { select: ["SchemaName"] }),
);
await run("getManyToManyRelationships", () =>
	md.getManyToManyRelationships("account", { select: ["SchemaName"] }),
);
await run("getGlobalOptionSet by name", () => md.getGlobalOptionSet("budgetstatus"));
await run("retrieveMetadataChanges", () =>
	md.retrieveMetadataChanges({
		Properties: { AllProperties: false, PropertyNames: ["LogicalName"] },
	}),
);
await run("getEntityDefinition name with quote", () => md.getEntityDefinition("x'y"));
console.log(
	"\nMetadataClient methods:",
	Object.getOwnPropertyNames(MetadataClient.prototype)
		.filter((n) => n !== "constructor")
		.join(", "),
);
// typed cast via escape hatch
await run("typed cast via client.api", () =>
	client
		.api(
			`/EntityDefinitions(LogicalName='account')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata`,
		)
		.select("LogicalName")
		.expand("OptionSet($select=Options)", "GlobalOptionSet($select=Options)")
		.get(),
);
