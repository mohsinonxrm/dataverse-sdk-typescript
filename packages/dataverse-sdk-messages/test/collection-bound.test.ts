/**
 * #69: messages for actions bound to an entity collection are sent to the entity set,
 * `POST /{entityset}/Microsoft.Dynamics.CRM.{Name}`. The bulk messages, bound to
 * `Collection(mscrm.crmbaseentity)`, take the entity set name as their first argument.
 */
import { describe, expect, it } from "vitest";
import { TEST_API_URL, createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  CreateExceptionRequest,
  CreateFlowMachineNetworkRequest,
  CreateMultipleRequest,
  DeleteMultipleRequest,
  DeliverIncomingEmailRequest,
  ExportTranslationRequest,
  FulfillSalesOrderRequest,
  GenerateSocialProfileRequest,
  UpdateMultipleRequest,
  UpsertMultipleRequest,
  ValidateSavedQueryRequest,
  msdyn_AsExchangeEventRequest,
} from "../src/index.js";

type RequestClass = new (...args: never[]) => {
  toRequestInformation(baseUrl: string): { url: string };
};

describe("#69: collection-bound messages", () => {
  it("every collection-bound message posts to its entity set", () => {
    const concrete: Record<string, RequestClass> = {
      CreateException: CreateExceptionRequest,
      CreateFlowMachineNetwork: CreateFlowMachineNetworkRequest,
      DeliverIncomingEmail: DeliverIncomingEmailRequest,
      ExportTranslation: ExportTranslationRequest,
      FulfillSalesOrder: FulfillSalesOrderRequest,
      GenerateSocialProfile: GenerateSocialProfileRequest,
      ValidateSavedQuery: ValidateSavedQueryRequest,
      msdyn_AsExchangeEvent: msdyn_AsExchangeEventRequest,
    };
    const urls: Record<string, string> = {};
    for (const [name, Request] of Object.entries(concrete)) {
      urls[name] = new Request().toRequestInformation(TEST_API_URL).url;
    }
    const bulk = {
      CreateMultipleRequest,
      UpdateMultipleRequest,
      UpsertMultipleRequest,
      DeleteMultipleRequest,
    };
    for (const [name, Request] of Object.entries(bulk)) {
      urls[name.replace("Request", "")] = new Request("accounts", []).toRequestInformation(
        TEST_API_URL
      ).url;
    }
    const paths = Object.fromEntries(
      Object.entries(urls).map(([k, v]) => [k, v.slice(TEST_API_URL.length)])
    );
    expect(paths).toEqual({
      CreateException: "/recurringappointmentmasters/Microsoft.Dynamics.CRM.CreateException",
      CreateFlowMachineNetwork:
        "/flowmachinenetworks/Microsoft.Dynamics.CRM.CreateFlowMachineNetwork",
      DeliverIncomingEmail: "/emails/Microsoft.Dynamics.CRM.DeliverIncomingEmail",
      ExportTranslation: "/solutions/Microsoft.Dynamics.CRM.ExportTranslation",
      FulfillSalesOrder: "/salesorders/Microsoft.Dynamics.CRM.FulfillSalesOrder",
      GenerateSocialProfile: "/socialprofiles/Microsoft.Dynamics.CRM.GenerateSocialProfile",
      ValidateSavedQuery: "/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery",
      msdyn_AsExchangeEvent:
        "/bookableresourcebookings/Microsoft.Dynamics.CRM.msdyn_AsExchangeEvent",
      CreateMultiple: "/accounts/Microsoft.Dynamics.CRM.CreateMultiple",
      UpdateMultiple: "/accounts/Microsoft.Dynamics.CRM.UpdateMultiple",
      UpsertMultiple: "/accounts/Microsoft.Dynamics.CRM.UpsertMultiple",
      DeleteMultiple: "/accounts/Microsoft.Dynamics.CRM.DeleteMultiple",
    });
  });

  it("ValidateSavedQueryRequest reaches /savedqueries through a DataverseClient", async () => {
    const { client, fake } = createTestClient();
    fake.on(
      "POST",
      "/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery",
      () => new Response(null, { status: 204 })
    );
    const fetchXml = "<fetch><entity name='account'/></fetch>";

    await client.execute(new ValidateSavedQueryRequest(fetchXml, 0));

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ FetchXml: fetchXml, QueryType: 0 });
  });

  it("CreateMultipleRequest sends only Targets; the entity set isn't a message parameter", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/contacts/Microsoft.Dynamics.CRM.CreateMultiple", () =>
      jsonResponse({ Ids: ["c1"] })
    );
    const targets = [{ "@odata.type": "Microsoft.Dynamics.CRM.contact", lastname: "One" }];
    const request = new CreateMultipleRequest("contacts", targets);

    await client.execute(request);

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ Targets: targets });
    expect(request.toRequestBody()).toEqual({ Targets: targets });
  });
});
