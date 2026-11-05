/**
 * #48 live: impersonating a user by systemuserid (MSCRMCallerID) and by Microsoft Entra object id
 * (CallerObjectId) both run a create as that user. (WhoAmI can't show it: it returns the caller
 * either way.) The user may lack the privilege to create accounts; then Dataverse refuses with
 * 0x80040220 naming the impersonated principal, which proves the same thing. Any account created
 * is deleted. Skipped when the org has no other enabled interactive user.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  DataverseError,
  Prefer,
  type DataverseRequestBuilder,
} from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

interface User {
  systemuserid: string;
  azureactivedirectoryobjectid: string;
}

const created: string[] = [];

afterAll(async () => {
  if (!live) return;
  for (const id of created) {
    await liveClient()
      .client.api(`accounts(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

/** The systemuserid the create ran as: createdby on success, the refused principal otherwise. */
async function createAs(
  impersonate: (b: DataverseRequestBuilder) => void
): Promise<string | undefined> {
  const builder = liveClient().client.api("accounts?$select=_createdby_value");
  impersonate(builder);
  try {
    const row = await builder
      .prefer(Prefer.returnRepresentation())
      .post<{ accountid: string; _createdby_value: string }>({
        name: `sdk-int impersonation ${runId}`,
      });
    created.push(row.accountid);
    return row._createdby_value;
  } catch (err) {
    expect(err).toBeInstanceOf(DataverseError);
    expect(err).toMatchObject({ status: 403, code: "0x80040220" });
    return /Principal user \(Id=([0-9a-f-]{36})/i.exec((err as Error).message)?.[1];
  }
}

describe.skipIf(!live)("live: impersonation (#48)", () => {
  it("MSCRMCallerID and CallerObjectId run as the same user", async (ctx) => {
    const { client } = liveClient();
    const me = await client.api("WhoAmI").get<{ UserId: string }>();
    const users = await client
      .api("systemusers")
      .select("systemuserid", "azureactivedirectoryobjectid")
      .filter(
        "isdisabled eq false and accessmode eq 0 and azureactivedirectoryobjectid ne null and applicationid eq null"
      )
      .top(5)
      .get<{ value: User[] }>();
    const user = users.value.find((u) => u.systemuserid !== me.UserId);
    if (!user) {
      ctx.skip();
      return;
    }

    const bySystemUserId = await createAs((b) => b.impersonate(user.systemuserid));
    const byObjectId = await createAs((b) =>
      b.impersonateByObjectId(user.azureactivedirectoryobjectid)
    );
    expect(bySystemUserId).toBe(user.systemuserid);
    expect(byObjectId).toBe(user.systemuserid);
  });
});
