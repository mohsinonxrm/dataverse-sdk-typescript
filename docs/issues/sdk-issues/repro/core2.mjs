import { SDK, fakeFetch, json, quiet, run } from "./harness.mjs";
const { DataverseClient } = await import(`${SDK}/dataverse-sdk-core/dist/index.js`);
const fn = await import(`${SDK}/dataverse-sdk-functions/dist/index.js`);
const mk = (responder, extra = {}) => {
	const f = fakeFetch(responder);
	const c = new DataverseClient({
		baseUrl: "https://org.crm.dynamics.com",
		fetchProvider: f,
		logger: quiet,
		...extra,
	});
	return { c, f };
};
await run("3b. POST with no explicit content-type", async () => {
	const { c, f } = mk(() => new Response(null, { status: 204 }));
	await c.api("/accounts").post({ name: "x" });
	return f.calls[0].init.headers;
});
await run("3c. execute(WhoAmIFunction) headers (case duplicates?)", async () => {
	const { c, f } = mk(() => json({ UserId: "u", BusinessUnitId: "b", OrganizationId: "o" }));
	const r = await c.execute(new fn.WhoAmIFunction());
	return { result: r, url: f.calls[0].url, headers: f.calls[0].init.headers };
});
await run("15. bindMany", async () => {
	const { c } = mk(() => json({}));
	const p = c
		.api("/accounts(00000000-0000-0000-0000-000000000001)")
		.bindMany("contact_customer_accounts", "contacts", [
			"00000000-0000-0000-0000-000000000002",
		]);
	try {
		await p;
		return "resolved";
	} catch (e) {
		return `rejected: ${e.message}`;
	}
});
