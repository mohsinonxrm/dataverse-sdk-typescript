/**
 * Live tests for #75: an overload per binding (RetrievePrincipalAccess on the calling user), and
 * ExportToExcel from the generator's supplemental definition. Creates one account named with this
 * run's id; afterAll deletes it.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  ExportToExcelAction,
  createEntityReference as actionReference,
} from "@mohsinonxrm/dataverse-sdk-actions";
import {
  RetrievePrincipalAccess_systemuserFunction,
  WhoAmIFunction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { ExportToExcelRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient, runId } from "./env.js";

const accounts: string[] = [];
// Dataverse rejects an empty QueryParameters ("Required field 'QueryParameters' is missing")
const NO_QUERY_PARAMETERS = { Arguments: { Count: 0, IsReadOnly: true, Keys: [], Values: [] } };

interface View {
  savedqueryid: string;
  fetchxml: string;
  layoutxml: string;
}

async function accountView(): Promise<View> {
  const { client } = liveClient();
  const views = await client
    .api("savedqueries")
    .select("savedqueryid", "fetchxml", "layoutxml")
    .filter("returnedtypecode eq 'account' and querytype eq 0 and statecode eq 0")
    .top(1)
    .get<{ value: View[] }>();
  const [view] = views.value;
  expect(view, "a public account view").toBeDefined();
  return view;
}

describe.skipIf(!live)("live: operation overloads and ExportToExcel (#75)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of accounts) await client.api(`accounts(${id})`).delete();
  });

  it("RetrievePrincipalAccess_systemuserFunction runs on /systemusers(id)", async () => {
    const { client } = liveClient();
    const me = await client.execute(new WhoAmIFunction());
    const id = await client.api("accounts").createAndGetId({ name: `${runId} access` });
    accounts.push(id);

    const access = await client.execute(
      new RetrievePrincipalAccess_systemuserFunction(
        me.UserId,
        createEntityReference("account", id)
      )
    );

    // Flags come back as member names: "ReadAccess, WriteAccess, …"
    expect(String(access.AccessRights)).toContain("ReadAccess");
  });

  it("ExportToExcelAction returns the view as an .xlsx file", async () => {
    const { client } = liveClient();
    const view = await accountView();

    const response = await client.execute(
      new ExportToExcelAction(
        actionReference("savedquery", view.savedqueryid),
        view.fetchxml,
        view.layoutxml,
        "",
        NO_QUERY_PARAMETERS
      )
    );

    // An .xlsx is a zip: base64 "UEsDB" is "PK\x03\x04"
    expect(response.ExcelFile.startsWith("UEsDB")).toBe(true);
  });

  it("ExportToExcelRequest returns the same", async () => {
    const { client } = liveClient();
    const view = await accountView();

    const response = await client.execute(
      new ExportToExcelRequest(
        { "@odata.type": "Microsoft.Dynamics.CRM.savedquery", savedqueryid: view.savedqueryid },
        view.fetchxml,
        view.layoutxml,
        "",
        NO_QUERY_PARAMETERS
      )
    );

    expect(response.result.ExcelFile?.startsWith("UEsDB")).toBe(true);
  });
});
