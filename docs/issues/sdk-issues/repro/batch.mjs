import { SDK, fakeFetch, quiet, run } from "./harness.mjs";
const { DataverseClient } = await import(`${SDK}/dataverse-sdk-core/dist/index.js`);
const { BatchRequestBuilder } = await import(`${SDK}/dataverse-sdk-batch/dist/index.js`);
const { decodeBatchResponse } = await import("./batch-src/decoding.js");
const { encodeBatchRequest } = await import("./batch-src/encoding.js");
// Response shape as returned by Dataverse for a batch of two DELETEs (no changeset), second one 404
const B = "batchresponse_1d7c7a5b-0000-4000-8000-000000000000";
const realResponse = [
	`--${B}`,
	"Content-Type: application/http",
	"Content-Transfer-Encoding: binary",
	"",
	"HTTP/1.1 204 No Content",
	"OData-Version: 4.0",
	"",
	"",
	`--${B}`,
	"Content-Type: application/http",
	"Content-Transfer-Encoding: binary",
	"",
	"HTTP/1.1 404 Not Found",
	"Content-Type: application/json; odata.metadata=minimal",
	"OData-Version: 4.0",
	"",
	'{"error":{"code":"0x80040217","message":"account With Id = 00000000-0000-0000-0000-000000000002 Does Not Exist"}}',
	`--${B}--`,
	"",
].join("\r\n");
await run(
	"B1. BatchRequestBuilder.execute(): what is sent, and what happens with the response",
	async () => {
		const f = fakeFetch(
			() =>
				new Response(realResponse, {
					status: 200,
					headers: { "content-type": `multipart/mixed; boundary=${B}` },
				}),
		);
		const c = new DataverseClient({
			baseUrl: "https://org.crm.dynamics.com",
			fetchProvider: f,
			logger: quiet,
		});
		const b = new BatchRequestBuilder(c);
		b.addRequest("d1", "DELETE", "accounts(00000000-0000-0000-0000-000000000001)");
		b.addRequest("d2", "DELETE", "accounts(00000000-0000-0000-0000-000000000002)");
		let outcome;
		try {
			outcome = await b.execute();
		} catch (e) {
			outcome = `THREW ${e.constructor.name}: ${e.message}`;
		}
		const sent = f.calls[0];
		return {
			url: sent.url,
			contentType: sent.init.headers["content-type"],
			bodyFirstChars: JSON.stringify(sent.init.body.slice(0, 40)),
			outcome,
		};
	},
);
await run(
	"B2. decodeBatchResponse() on a real-shaped response (no Content-ID outside changesets)",
	async () => {
		const m = decodeBatchResponse(realResponse, `multipart/mixed; boundary=${B}`);
		return { partsInResponse: 2, decoded: m.size };
	},
);
await run(
	"B3. encodeBatchRequest(): Content-ID on non-changeset parts; changeset ids renumbered",
	async () => {
		const body = encodeBatchRequest(
			[{ id: "get1", method: "GET", url: "/api/data/v9.2/WhoAmI" }],
			[
				[{ id: "a", method: "POST", url: "/api/data/v9.2/accounts", body: { name: "a" } }],
				[{ id: "b", method: "POST", url: "/api/data/v9.2/accounts", body: { name: "b" } }],
			],
			"batch_X",
		);
		return body.split("\r\n").filter((l) => /^Content-ID|^GET|^POST/i.test(l));
	},
);
