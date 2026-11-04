import { SDK, fakeFetch, json, quiet, run } from "./harness.mjs";
const { DataverseClient } = await import(`${SDK}/dataverse-sdk-core/dist/index.js`);
const { OrganizationService } = await import(`${SDK}/dataverse-sdk-xrm/dist/index.js`);
const ID = "00000000-0000-0000-0000-000000000001";
const mk = (responder) => {
	const f = fakeFetch(responder);
	return {
		f,
		svc: new OrganizationService(
			new DataverseClient({
				baseUrl: "https://org.crm.dynamics.com",
				fetchProvider: f,
				logger: quiet,
			}),
		),
	};
};
await run("X1. create() against a real 204 + OData-EntityId", async () => {
	const { svc, f } = mk(
		() =>
			new Response(null, {
				status: 204,
				headers: {
					"OData-EntityId": `https://org.crm.dynamics.com/api/data/v9.2/accounts(${ID})`,
				},
			}),
	);
	try {
		return await svc.create("accounts", { name: "x" });
	} finally {
		console.log("   sent headers:", f.calls[0]?.init.headers);
	}
});
await run("X1b. create(..., {returnRepresentation:true}) — is Prefer sent?", async () => {
	const { svc, f } = mk(() => json({ accountid: ID, name: "x" }, 201));
	try {
		return await svc.create("accounts", { name: "x" }, { returnRepresentation: true });
	} finally {
		console.log("   prefer header sent:", f.calls[0]?.init.headers.prefer);
	}
});
await run("X2. retrieve()", async () => {
	const { svc } = mk(() => json({ accountid: ID, name: "x" }));
	return await svc.retrieve("accounts", ID, { select: ["name"] });
});
await run("X3. retrieveMultiple()", async () => {
	const { svc } = mk(() => json({ value: [] }));
	return await svc.retrieveMultiple("accounts", { select: ["name"] });
});
await run("X4. update() with ifMatch — is If-Match sent?", async () => {
	const { svc, f } = mk(() => new Response(null, { status: 204 }));
	await svc
		.update("accounts", ID, { name: "y" }, { ifMatch: 'W/"123"' })
		.catch((e) => console.log("   threw", e.message));
	return { headers: f.calls[0]?.init.headers };
});
await run("X5. delete()", async () => {
	const { svc, f } = mk(() => new Response(null, { status: 204 }));
	await svc.delete("accounts", ID);
	return f.calls[0]?.url;
});
await run("X6. whoAmI()", async () => {
	const { svc, f } = mk(() => json({ UserId: "u", BusinessUnitId: "b", OrganizationId: "o" }));
	const r = await svc.whoAmI();
	return { r, url: f.calls[0].url };
});
await run("X7. setState()", async () => {
	const { svc, f } = mk(() => new Response(null, { status: 204 }));
	await svc.setState("accounts", ID, 1, 2);
	return { method: f.calls[0].init.method, url: f.calls[0].url, body: f.calls[0].init.body };
});
