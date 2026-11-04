import { SDK, fakeFetch, json, quiet, run } from "./harness.mjs";
const core = await import(`${SDK}/dataverse-sdk-core/dist/index.js`);
const { DataverseClient } = core;
const mk = (responder, extra = {}) => {
	const f = fakeFetch(responder);
	const c = new DataverseClient({
		baseUrl: "https://org.crm.dynamics.com",
		fetchProvider: f,
		logger: quiet,
		tokenProvider: { getToken: async () => "tok" },
		...extra,
	});
	return { c, f };
};
const fetchXml = `<fetch top="50"><entity name="account"><attribute name="name"/><attribute name="accountnumber"/><filter><condition attribute="statecode" operator="eq" value="0"/></filter></entity></fetch>`;

await run("1. FetchXML in path via api().get()", async () => {
	const { c, f } = mk(() => json({ value: [] }));
	await c.api(`/accounts?fetchXml=${encodeURIComponent(fetchXml)}`).get();
	return f.calls.length;
});
await run("1b. 20-column $select via api().select().get()", async () => {
	const { c } = mk(() => json({ value: [] }));
	const cols = Array.from({ length: 20 }, (_, i) => `new_customattribute${i}`);
	await c
		.api("/accounts")
		.select(...cols)
		.get();
});
await run("1c. nextLink with long $skiptoken via iterate()", async () => {
	const skip = encodeURIComponent(
		'<cookie pagenumber="2" pagingcookie="' +
			"%253ccookie%2520page%253d%25221%2522%253e%253caccountid%2520last%253d%2522%257b11111111-1111-1111-1111-111111111111%257d%2522%2520first%253d%2522%257b22222222-2222-2222-2222-222222222222%257d%2522%2520%252f%253e%253c%252fcookie%253e" +
			'" istracking="False" />',
	);
	const { c } = mk((url, _i, n) =>
		json(
			n === 1
				? {
						value: [{ a: 1 }],
						"@odata.nextLink": `https://org.crm.dynamics.com/api/data/v9.2/accounts?$select=name&$skiptoken=${skip}`,
					}
				: { value: [{ a: 2 }] },
		),
	);
	const out = [];
	for await (const r of c.api("/accounts").select("name").iterate()) out.push(r);
	return out;
});

await run("2. string body is JSON.stringified (send with raw multipart string)", async () => {
	const { c, f } = mk(
		() =>
			new Response("", {
				status: 200,
				headers: { "content-type": "multipart/mixed; boundary=batchresponse_x" },
			}),
	);
	const body =
		"--batch_x\r\nContent-Type: application/http\r\n\r\nGET /api/data/v9.2/WhoAmI() HTTP/1.1\r\n\r\n--batch_x--";
	await c.send({
		method: "POST",
		url: `${c.getBaseUrl()}/$batch`,
		headers: { "content-type": "multipart/mixed; boundary=batch_x" },
		body,
	});
	const sent = f.calls[0].init;
	return { sentBodyStartsWith: sent.body.slice(0, 20), headers: sent.headers };
});

await run("3. headers on a POST (case duplication / extra headers)", async () => {
	const { c, f } = mk(
		() =>
			new Response(null, {
				status: 204,
				headers: {
					"OData-EntityId":
						"https://org.crm.dynamics.com/api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001)",
				},
			}),
	);
	const r = await c
		.api("/accounts")
		.post({ name: "x" }, { headers: { "Content-Type": "application/json; charset=utf-8" } });
	return { returned: r, headers: f.calls[0].init.headers };
});

await run("4. create (204 + OData-EntityId): builder exposes no id", async () => {
	const { c } = mk(
		() =>
			new Response(null, {
				status: 204,
				headers: {
					"OData-EntityId":
						"https://org.crm.dynamics.com/api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001)",
				},
			}),
	);
	return { postResult: await c.api("/accounts").post({ name: "x" }) };
});

await run("4b. get() on 204 No Content", async () => {
	const { c } = mk(() => new Response(null, { status: 204 }));
	return await c
		.api("/accounts(00000000-0000-0000-0000-000000000001)/Microsoft.Dynamics.CRM.Foo")
		.get();
});

await run("5. retry: {maxRetries:0} honoured?", async () => {
	const { c, f } = mk(
		() =>
			json({ error: { code: "0x80072322", message: "Number of requests exceeded" } }, 429, {
				"Retry-After": "1",
			}),
		{ retry: { maxRetries: 0 } },
	);
	try {
		await c.api("/WhoAmI()").get();
	} catch (e) {
		return {
			calls: f.calls.length,
			error: e.constructor.name,
			retryAfterMs: e.retryAfterMs,
			status: e.status,
			code: e.code,
		};
	}
});

await run("5b. Retry-After not capped by maxDelayMs", async () => {
	const { c, f } = mk(
		(u, i, n) =>
			n === 1
				? json({ error: { code: "0x80072322", message: "x" } }, 429, { "Retry-After": "2" })
				: json({ UserId: "u" }),
		{ retry: { maxRetries: 1, maxDelayMs: 50, baseDelayMs: 10 } },
	);
	const t = Date.now();
	await c.api("/WhoAmI()").get();
	return {
		calls: f.calls.length,
		waitedMs: Date.now() - t,
		retryAttemptHeader: f.calls[1].init.headers["Retry-Attempt"],
	};
});

await run("5c. non-idempotent POST retried on 503 (action could run twice)", async () => {
	const { c, f } = mk(
		(u, i, n) =>
			n === 1
				? json({ error: { code: "0x80040216", message: "Service unavailable" } }, 503)
				: json({}),
		{ retry: { maxRetries: 2, baseDelayMs: 1, maxDelayMs: 1 } },
	);
	await c
		.api(
			"/workflows(00000000-0000-0000-0000-000000000001)/Microsoft.Dynamics.CRM.ExecuteWorkflow",
		)
		.post({ EntityId: "00000000-0000-0000-0000-000000000002" });
	return { postsSent: f.calls.filter((x) => x.init.method === "POST").length };
});

await run("5d. per-request middlewareOptions (retry override) ignored", async () => {
	const { c, f } = mk(
		() => json({ error: { code: "0x80072322", message: "x" } }, 429, { "Retry-After": "0" }),
		{ retry: { maxRetries: 2, baseDelayMs: 1, maxDelayMs: 1 } },
	);
	try {
		await c
			.api("/WhoAmI()")
			.get({ middlewareOptions: new Map([["retry", { maxRetries: 0 }]]) });
	} catch {}
	return { calls: f.calls.length, expected: 1 };
});

await run(
	"6. telemetry headers on every request + correlation id reused across requests",
	async () => {
		const { c, f } = mk(() => json({ value: [] }));
		await c.api("/accounts").get();
		await c.api("/contacts").get();
		const h = f.calls.map((x) => x.init.headers);
		return {
			first: Object.keys(h[0]),
			sameCorrelationId: h[0]["x-ms-correlation-id"] === h[1]["x-ms-correlation-id"],
			sdkVersionHeader: h[0]["x-ms-sdk-version"],
		};
	},
);

await run("7. default logger writes console.debug on every request", async () => {
	const f = fakeFetch(() => json({ value: [] }));
	let n = 0;
	const orig = console.debug;
	console.debug = () => {
		n++;
	};
	try {
		await new DataverseClient({ baseUrl: "https://org.crm.dynamics.com", fetchProvider: f })
			.api("/accounts")
			.get();
	} finally {
		console.debug = orig;
	}
	return { consoleDebugCalls: n };
});

await run("8. error hierarchy: auth error not instanceof exported DataverseError", async () => {
	const names = Object.keys(core).filter((k) => /Error$/.test(k));
	const { c } = mk(() => json({}), {
		tokenProvider: {
			getToken: async () => {
				throw new Error("boom");
			},
		},
	});
	let e;
	try {
		await c.api("/WhoAmI()").get();
	} catch (x) {
		e = x;
	}
	return { exportedErrorClasses: names, tokenFailureSurfacesAs: e?.constructor?.name };
});

await run("8b. 400 OData error: fields available", async () => {
	const { c } = mk(() =>
		json(
			{
				error: {
					code: "0x80041103",
					message: "'account' entity doesn't contain attribute with Name = 'nam'.",
					"@Microsoft.PowerApps.CDS.ErrorDetails.ApiExceptionSourceKey": "x",
				},
			},
			400,
			{ "x-ms-service-request-id": "srv-req-1", req_id: "rid-1" },
		),
	);
	try {
		await c.api("/accounts").select("nam").get();
	} catch (e) {
		return {
			name: e.constructor.name,
			status: e.status,
			code: e.code,
			message: e.message,
			requestId: e.requestId,
			correlationId: e.correlationId,
			instanceofDataverseError: e instanceof core.DataverseError,
		};
	}
});

await run("9. abort surfaces as raw DOMException (not a typed SDK error)", async () => {
	const f = {
		fetch: (u, init) =>
			new Promise((_, rej) =>
				init.signal.addEventListener("abort", () => rej(init.signal.reason)),
			),
	};
	const c = new DataverseClient({
		baseUrl: "https://org.crm.dynamics.com",
		fetchProvider: f,
		logger: quiet,
	});
	const ac = new AbortController();
	setTimeout(() => ac.abort(), 10);
	try {
		await c.api("/accounts").get({ signal: ac.signal });
	} catch (e) {
		return `${e.constructor.name} / ${e.name}`;
	}
});

await run("10. network error (fetch throws) not retried", async () => {
	const f = fakeFetch(() => {
		throw new TypeError("Failed to fetch");
	});
	const c = new DataverseClient({
		baseUrl: "https://org.crm.dynamics.com",
		fetchProvider: f,
		logger: quiet,
		retry: { maxRetries: 3, baseDelayMs: 1 },
	});
	try {
		await c.api("/accounts").get();
	} catch (e) {
		return { calls: f.calls.length, error: e.constructor.name };
	}
});

await run("11. prefer() chaining: returns PreferBuilder, cannot chain .get()", async () => {
	const { c } = mk(() => json({ value: [] }));
	const b = c.api("/accounts").prefer();
	return { type: b.constructor.name, hasGet: typeof b.get };
});

await run("11b. annotations + representation Prefer header value", async () => {
	const { c, f } = mk(() => json({ value: [] }));
	const b = c.api("/accounts");
	b.prefer().allAnnotations().maxPageSize(50).returnRepresentation();
	await b.get();
	return f.calls[0].init.headers.prefer;
});

await run("12. getAll({maxPages:1}) ignored", async () => {
	const { c, f } = mk((u, i, n) =>
		json(
			n < 4
				? {
						value: [{ n }],
						"@odata.nextLink": `https://org.crm.dynamics.com/api/data/v9.2/accounts?$skiptoken=${n}`,
					}
				: { value: [{ n }] },
		),
	);
	const all = await c.api("/accounts").getAll({ maxPages: 1 });
	return { items: all.length, requests: f.calls.length };
});

await run("13. query re-serialization: path query + builder $select", async () => {
	const { c, f } = mk(() => json({ value: [] }));
	await c
		.api(`/accounts?$filter=${encodeURIComponent("name eq 'O''Brien & Co'")}`)
		.select("name")
		.get();
	return f.calls[0].url;
});

await run("14. concurrency default + shared ctx.attempt across concurrent requests", async () => {
	let inflight = 0,
		max = 0;
	const f = {
		fetch: async () => {
			inflight++;
			max = Math.max(max, inflight);
			await new Promise((r) => setTimeout(r, 20));
			inflight--;
			return json({ value: [] });
		},
	};
	const c = new DataverseClient({
		baseUrl: "https://org.crm.dynamics.com",
		fetchProvider: f,
		logger: quiet,
	});
	await Promise.all(Array.from({ length: 30 }, () => c.api("/accounts").get()));
	return { maxConcurrent: max };
});

await run("15. bindMany uses new Function dynamic import", async () => {
	const { c } = mk(() => json({}));
	try {
		await c
			.api("/accounts(00000000-0000-0000-0000-000000000001)")
			.bindMany("contact_customer_accounts", "contacts", [
				"00000000-0000-0000-0000-000000000002",
			])
			.post({});
		return "ok";
	} catch (e) {
		return `${e.constructor.name}: ${e.message}`;
	}
});
