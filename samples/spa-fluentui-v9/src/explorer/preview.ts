/**
 * The request preview: what the SDK will send, before it is sent. The request is run through a
 * real `DataverseClient` whose `fetch` records the request and answers `204 No Content` without
 * going anywhere, so the preview shows the URL, headers and body exactly as the SDK pipeline
 * builds them (query encoding, `OData-Version`, `Prefer`, impersonation headers, …).
 */
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

export interface RequestPreview {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

/** Headers that change on every request, left out so the preview stays stable. */
const VOLATILE = new Set(["x-ms-correlation-id", "x-ms-client-request-id", "client-request-id"]);

async function bodyText(body: BodyInit | null | undefined): Promise<string | undefined> {
  if (body === undefined || body === null) return undefined;
  if (typeof body === "string") return body;
  return new Response(body).text();
}

export interface PreviewResult {
  requests: RequestPreview[];
  /** Why the SDK refused to send anything, e.g. a URL of another origin. */
  error?: unknown;
}

/**
 * The requests `send` makes with a client for `environmentUrl`, without sending them.
 * `Authorization` is masked.
 */
export async function previewRequests(
  environmentUrl: string,
  send: (client: DataverseClient) => Promise<unknown>
): Promise<PreviewResult> {
  const captured: RequestPreview[] = [];
  const client = new DataverseClient({
    baseUrl: environmentUrl,
    tokenProvider: { getToken: () => Promise.resolve("preview") },
    retry: { maxRetries: 0 },
    fetchProvider: {
      async fetch(input, init) {
        const url =
          typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const headers: Record<string, string> = {};
        new Headers(init?.headers).forEach((value, name) => {
          if (VOLATILE.has(name)) return;
          headers[name] = name === "authorization" ? "Bearer (your access token)" : value;
        });
        captured.push({
          method: init?.method ?? "GET",
          url,
          headers,
          body: await bodyText(init?.body),
        });
        return new Response(null, { status: 204 });
      },
    },
  });
  try {
    await send(client);
  } catch (error) {
    // After a request went out, the error is the empty 204 not parsing as the operation's
    // response: only the request matters here. Before, it's why nothing would be sent.
    if (!captured.length) return { requests: captured, error };
  }
  return { requests: captured };
}

/** A preview as an HTTP request message. */
export function httpText(preview: RequestPreview): string {
  const lines = [`${preview.method} ${preview.url}`];
  for (const [name, value] of Object.entries(preview.headers)) lines.push(`${name}: ${value}`);
  if (preview.body !== undefined) {
    let body = preview.body;
    try {
      body = JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      // Not JSON: as sent.
    }
    lines.push("", body);
  }
  return lines.join("\n");
}
