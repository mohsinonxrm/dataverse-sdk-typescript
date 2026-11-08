/**
 * Live (#97): a request carrying W3C trace context. A telemetry client whose dependency handle
 * supplies `traceparent` / `tracestate` makes the SDK send them; this checks the SDK sends them
 * on the wire and that Dataverse accepts such a request (Node; a browser also needs CORS to allow
 * the header, which is why the browser App Insights adapter leaves propagation off by default).
 */
import { describe, expect, it } from "vitest";
import {
  DataverseClient,
  type DependencyTelemetry,
  type FetchProvider,
  type TelemetryClient,
} from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, orgUrl } from "./env.js";

const TRACEPARENT = "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01";

describe.skipIf(!live)("live: W3C trace context (#97)", () => {
  it("sends traceparent and tracestate, and Dataverse accepts the request", async () => {
    const { tokenProvider } = liveClient();
    const sent: Headers[] = [];
    const fetchProvider: FetchProvider = {
      fetch: (input, init) => {
        sent.push(new Headers(init?.headers));
        return fetch(input, init);
      },
    };
    const ended: DependencyTelemetry[] = [];
    const telemetry: TelemetryClient = {
      trackEvent: () => undefined,
      trackException: () => undefined,
      startDependency: () => ({
        headers: { traceparent: TRACEPARENT, tracestate: "sdk=test" },
        end: (data) => {
          ended.push(data);
        },
      }),
    };
    const client = new DataverseClient({
      baseUrl: orgUrl,
      tokenProvider,
      fetchProvider,
      telemetry,
    });

    const who = await client.api("WhoAmI").get<{ UserId: string }>();

    expect(who.UserId).toMatch(/^[0-9a-f-]{36}$/);
    expect(sent[0]?.get("traceparent")).toBe(TRACEPARENT);
    expect(sent[0]?.get("tracestate")).toBe("sdk=test");
    expect(ended[0]).toMatchObject({ success: true, resultCode: "200" });
  });
});
