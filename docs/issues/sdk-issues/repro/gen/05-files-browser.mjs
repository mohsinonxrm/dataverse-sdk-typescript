// files package has no dist; files-bundle.mjs is an esbuild transpile of packages/dataverse-sdk-files/src (see report)
// Simulate a browser: no global Buffer.
delete globalThis.Buffer;
const { FileColumnClient } = await import("./files-bundle.mjs");
const sent = [];
const adapter = {
	send: async (req) => {
		sent.push(req);
		return new Response(JSON.stringify({ FileContinuationToken: "t" }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	},
};
const fc = new FileColumnClient(adapter, "https://org.crm.dynamics.com/api/data/v9.2");
try {
	await fc.upload(
		"accounts",
		"{ABC}",
		"new_file",
		new Blob(["hello"], { type: "text/plain" }),
		"a.txt",
	);
	console.log("upload ok");
} catch (e) {
	console.log(
		"upload(Blob) in Buffer-less env ->",
		e.name + ": " + e.message,
		"| requests sent:",
		sent.length,
	);
}
// With Buffer restored, inspect the InitializeFileBlocksUpload body
globalThis.Buffer = (await import("node:buffer")).Buffer;
sent.length = 0;
await fc.upload("accounts", "{ABC}", "new_file", new Blob(["hello"]), "a.txt");
console.log("Init body:", JSON.stringify(sent[0].body));
const failing = { send: async () => new Response('{"error":{"message":"bad"}}', { status: 400 }) };
try {
	await new FileColumnClient(failing, "https://x/api/data/v9.2").upload(
		"accounts",
		"1",
		"c",
		new Blob(["x"]),
		"a",
	);
	console.log("upload with 400 responses resolved without error?");
} catch (e) {
	console.log("400 ->", e.message);
}
