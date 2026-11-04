export const SDK = "/home/user/mohsinonxrm/dataverse-sdk-typescript/packages";
export function fakeFetch(responder) {
	const calls = [];
	return {
		calls,
		fetch: async (url, init) => {
			calls.push({ url: String(url), init });
			return responder(String(url), init, calls.length);
		},
	};
}
export const json = (body, status = 200, headers = {}) =>
	new Response(body === undefined ? null : JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; odata.metadata=minimal", ...headers },
	});
export const quiet = { debug() {}, info() {}, warn() {}, error() {} };
export async function run(name, fn) {
	try {
		const r = await fn();
		console.log(`\n## ${name}\n`, r === undefined ? "" : r);
	} catch (e) {
		console.log(`\n## ${name}\nTHREW ${e?.constructor?.name}: ${e?.message}`);
	}
}
