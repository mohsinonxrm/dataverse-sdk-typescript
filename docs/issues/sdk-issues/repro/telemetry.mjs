import { SDK, fakeFetch, json, quiet, run } from "./harness.mjs";
const { DataverseClient } = await import(`${SDK}/dataverse-sdk-core/dist/index.js`);
for (const [pkg, cls, opts] of [
	[
		"appinsights",
		"ApplicationInsightsTelemetryClient",
		{ connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000" },
	],
	[
		"otel",
		"OpenTelemetryClient",
		{ tracer: { startSpan: () => ({ end() {}, setAttribute() {} }) } },
	],
]) {
	await run(`T. ${pkg}: request with telemetry adapter`, async () => {
		const mod = await import(`${SDK}/dataverse-sdk-${pkg}/dist/index.js`);
		const f = fakeFetch(() => json({ value: [] }));
		const c = new DataverseClient({
			baseUrl: "https://org.crm.dynamics.com",
			fetchProvider: f,
			logger: quiet,
			telemetry: new mod[cls](opts),
		});
		await c.api("/accounts").get();
		return "ok";
	});
}
