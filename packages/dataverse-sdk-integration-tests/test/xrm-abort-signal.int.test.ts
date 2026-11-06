/**
 * #273 live: OrganizationService methods take an AbortSignal, and aborting it cancels the
 * request against a real org. Read-only: creates nothing.
 */
import { describe, expect, it } from "vitest";
import { DataverseAbortError } from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: OrganizationService AbortSignal (#273)", () => {
  it("a live signal changes nothing", async () => {
    const service = new OrganizationService(liveClient().client);
    const { signal } = new AbortController();

    const me = await service.whoAmI({ signal });
    expect(me.UserId).toMatch(/^[0-9a-f-]{36}$/);
    const page = await service.retrieveMultiple("accounts", { select: ["name"], top: 1, signal });
    expect(Array.isArray(page.value)).toBe(true);
    await expect(service.getEntitySetName("opportunity", { signal })).resolves.toBe(
      "opportunities"
    );
  });

  it("aborting while the request is in flight rejects with DataverseAbortError", async () => {
    const service = new OrganizationService(liveClient().client);
    await service.whoAmI(); // a cached token, so the abort lands on the HTTP request
    const controller = new AbortController();

    const pending = service.retrieveMultiple("accounts", {
      select: ["name"],
      top: 1,
      signal: controller.signal,
    });
    setTimeout(() => {
      controller.abort();
    }, 1);

    await expect(pending).rejects.toBeInstanceOf(DataverseAbortError);
  });

  it("an aborted entity set name lookup is not cached", async () => {
    const service = new OrganizationService(liveClient().client);

    await expect(
      service.getEntitySetName("systemuser", { signal: AbortSignal.abort() })
    ).rejects.toBeInstanceOf(DataverseAbortError);
    const controller = new AbortController();
    const pending = service.getEntitySetName("activityparty", { signal: controller.signal });
    controller.abort();
    await expect(pending).rejects.toBeInstanceOf(DataverseAbortError);

    await expect(service.getEntitySetName("activityparty")).resolves.toBe("activityparties");
  });
});
