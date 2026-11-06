/**
 * #75: ExportToExcel isn't in `$metadata`, so it wasn't generated. It now comes from the
 * generator's supplemental definition, with the five parameters a live org requires. AddItemCampaign
 * (bound to campaign, list, product and salesliterature) has one class per binding, and no
 * plain-name `AddItemCampaignAction` (#286).
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as actions from "../src/index.js";
import { ExportToExcelAction, createEntityReference } from "../src/index.js";

describe("#75: ExportToExcel and action overloads", () => {
  it("ExportToExcel posts View, FetchXml, LayoutXml, QueryApi and QueryParameters", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/ExportToExcel", () => jsonResponse({ ExcelFile: "UEsDBA==" }));

    const response = await client.execute(
      new ExportToExcelAction({
        View: createEntityReference("savedquery", "v1"),
        FetchXml: "<fetch/>",
        LayoutXml: "<grid/>",
        QueryApi: "",
        QueryParameters: {},
      })
    );

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      View: { "@odata.type": "Microsoft.Dynamics.CRM.savedquery", savedqueryid: "v1" },
      FetchXml: "<fetch/>",
      LayoutXml: "<grid/>",
      QueryApi: "",
      QueryParameters: {},
    });
    expect(response.ExcelFile).toBe("UEsDBA==");
  });

  it("AddItemCampaign has one class per binding, each on its own entity set", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", /AddItemCampaign/, () => jsonResponse({ CampaignItemId: "i1" }));

    await client.execute(
      new actions.AddItemCampaign_listAction("l1", {
        Campaign: createEntityReference("campaign", "c1"),
      })
    );

    expect(fake.last().path).toBe("/lists(l1)/Microsoft.Dynamics.CRM.AddItemCampaign");
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Campaign: { "@odata.type": "Microsoft.Dynamics.CRM.campaign", campaignid: "c1" },
    });
    expect(Object.keys(actions).filter((n) => n.startsWith("AddItemCampaign_"))).toEqual([
      "AddItemCampaign_campaignAction",
      "AddItemCampaign_listAction",
      "AddItemCampaign_productAction",
      "AddItemCampaign_salesliteratureAction",
    ]);
  });

  it("#286: AddItemCampaign has no plain-name class, since it has no unbound overload", () => {
    expect(Object.keys(actions).filter((n) => /^AddItemCampaign(_|Action$)/.test(n))).toEqual([
      "AddItemCampaign_campaignAction",
      "AddItemCampaign_listAction",
      "AddItemCampaign_productAction",
      "AddItemCampaign_salesliteratureAction",
    ]);
    expect("AddItemCampaignAction" in actions).toBe(false);
  });
});
