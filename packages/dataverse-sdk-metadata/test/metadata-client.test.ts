import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataClient } from "../src/MetadataClient.js";

const BASE_URL = "https://test.crm.dynamics.com/api/data/v9.2";

// MSW server
const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("MetadataClient", () => {
  let client: DataverseClient;
  let metadataClient: MetadataClient;

  beforeAll(() => {
    client = new DataverseClient({
      baseUrl: BASE_URL,
      getAccessToken: () => ({
        token: "test-token",
        expiresOnTimestamp: Date.now() + 3600000,
      }),
    });
    metadataClient = new MetadataClient(client);
  });

  describe("Entity Operations", () => {
    it("should get entity definitions with correct URL and method", async () => {
      server.use(
        http.get(`${BASE_URL}/EntityDefinitions`, ({ request }) => {
          expect(request.method).toBe("GET");
          return HttpResponse.json({
            value: [
              {
                "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
                MetadataId: "70816501-edb9-4740-a16c-6a5efbc05d84",
                LogicalName: "account",
              },
            ],
          });
        })
      );

      const entities = await metadataClient.getEntityDefinitions();
      expect(entities).toHaveLength(1);
      expect(entities[0].LogicalName).toBe("account");
    });

    it("should get single entity definition by LogicalName", async () => {
      server.use(
        http.get(`${BASE_URL}/EntityDefinitions*`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.pathname).toContain("EntityDefinitions(LogicalName='account')");
          expect(request.method).toBe("GET");
          return HttpResponse.json({
            "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
            MetadataId: "70816501-edb9-4740-a16c-6a5efbc05d84",
            LogicalName: "account",
            SchemaName: "Account",
          });
        })
      );

      const entity = await metadataClient.getEntityDefinition("account");
      expect(entity.LogicalName).toBe("account");
    });

    it("should create entity definition with POST and return MetadataId", async () => {
      server.use(
        http.post(`${BASE_URL}/EntityDefinitions`, async ({ request }) => {
          expect(request.method).toBe("POST");
          const body = (await request.json()) as any;
          expect(body["@odata.type"]).toBe("Microsoft.Dynamics.CRM.EntityMetadata");
          expect(body.SchemaName).toBe("new_customentity");

          return HttpResponse.json(
            { MetadataId: "12345678-1234-1234-1234-123456789abc" },
            { status: 201 }
          );
        })
      );

      const metadataId = await metadataClient.createEntityDefinition({
        "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
        SchemaName: "new_customentity",
        DisplayName: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: "Custom Entity",
              LanguageCode: 1033,
            },
          ],
        },
        OwnershipType: "UserOwned",
        HasActivities: false,
        HasNotes: false,
      });

      expect(metadataId).toBe("12345678-1234-1234-1234-123456789abc");
    });

    it("should update entity definition using PUT with MSCRM.MergeLabels header", async () => {
      let capturedMethod = "";
      let capturedHeader = "";

      server.use(
        http.put(`${BASE_URL}/EntityDefinitions*`, async ({ request }) => {
          const url = new URL(request.url);
          expect(url.pathname).toContain("EntityDefinitions(LogicalName='account')");
          capturedMethod = request.method;
          capturedHeader = request.headers.get("MSCRM.MergeLabels") ?? "";
          const body = (await request.json()) as any;
          expect(body["@odata.type"]).toBe("Microsoft.Dynamics.CRM.EntityMetadata");

          return new HttpResponse(null, { status: 204 });
        })
      );

      await metadataClient.updateEntityDefinition("account", {
        "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
        DisplayName: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: "Updated Account",
              LanguageCode: 1033,
            },
          ],
        },
      });

      // Critical verification: PUT not PATCH
      expect(capturedMethod).toBe("PUT");
      expect(capturedHeader).toBe("true");
    });

    it("should delete entity definition using LogicalName", async () => {
      server.use(
        http.delete(`${BASE_URL}/EntityDefinitions*`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.pathname).toContain("EntityDefinitions(LogicalName='new_test')");
          expect(request.method).toBe("DELETE");
          return new HttpResponse(null, { status: 204 });
        })
      );

      await metadataClient.deleteEntityDefinition("new_test");
    });
  });

  describe("Attribute Operations", () => {
    it("should get attribute definitions for entity", async () => {
      server.use(
        http.get(`${BASE_URL}/EntityDefinitions*`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.pathname).toContain("/Attributes");
          expect(request.method).toBe("GET");
          return HttpResponse.json({
            value: [
              {
                "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
                MetadataId: "attr-id-1",
                LogicalName: "name",
              },
            ],
          });
        })
      );

      const attributes = await metadataClient.getAttributeDefinitions("account");
      expect(attributes).toHaveLength(1);
      expect(attributes[0].LogicalName).toBe("name");
    });

    it("should create attribute with correct URL pattern", async () => {
      server.use(
        http.post(`${BASE_URL}/EntityDefinitions*`, async ({ request }) => {
          const url = new URL(request.url);
          expect(url.pathname).toContain("/Attributes");
          expect(request.method).toBe("POST");
          const body = (await request.json()) as any;
          expect(body["@odata.type"]).toBe("Microsoft.Dynamics.CRM.StringAttributeMetadata");

          return HttpResponse.json({ MetadataId: "new-attr-metadata-id" }, { status: 201 });
        })
      );

      const attrId = await metadataClient.createAttributeDefinition("account", {
        "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
        SchemaName: "new_customfield",
        RequiredLevel: { Value: "None" },
        DisplayName: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: "Custom Field",
              LanguageCode: 1033,
            },
          ],
        },
        MaxLength: 100,
        FormatName: { Value: "Text" },
      });

      expect(attrId).toBe("new-attr-metadata-id");
    });

    it("should update attribute using PUT with MSCRM.MergeLabels", async () => {
      let capturedMethod = "";
      let capturedHeader = "";

      server.use(
        http.put(`${BASE_URL}/EntityDefinitions*`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.pathname).toContain("/Attributes(LogicalName='new_field')");
          capturedMethod = request.method;
          capturedHeader = request.headers.get("MSCRM.MergeLabels") ?? "";
          return new HttpResponse(null, { status: 204 });
        })
      );

      await metadataClient.updateAttributeDefinition("account", "new_field", {
        "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
        DisplayName: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: "Updated Field",
              LanguageCode: 1033,
            },
          ],
        },
      });

      expect(capturedMethod).toBe("PUT");
      expect(capturedHeader).toBe("true");
    });
  });

  describe("Relationship Operations", () => {
    it("should create one-to-many relationship and extract MetadataId", async () => {
      server.use(
        http.post(`${BASE_URL}/RelationshipDefinitions`, async ({ request }) => {
          expect(request.method).toBe("POST");
          const body = (await request.json()) as any;
          expect(body["@odata.type"]).toBe("Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata");

          return HttpResponse.json({ MetadataId: "rel-id-123" }, { status: 201 });
        })
      );

      const relId = await metadataClient.createOneToManyRelationship({
        "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
        SchemaName: "new_account_contact",
        ReferencedEntity: "account",
        ReferencedAttribute: "accountid",
        ReferencingEntity: "contact",
        Lookup: {
          SchemaName: "new_accountid",
          DisplayName: {
            "@odata.type": "Microsoft.Dynamics.CRM.Label",
            LocalizedLabels: [
              {
                "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
                Label: "Account",
                LanguageCode: 1033,
              },
            ],
          },
        },
      });

      expect(relId).toBe("rel-id-123");
    });

    it("should update relationship using PUT with SchemaName", async () => {
      let capturedMethod = "";

      server.use(
        http.put(`${BASE_URL}/RelationshipDefinitions*`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.pathname).toContain(
            "RelationshipDefinitions(SchemaName='new_account_contact')"
          );
          capturedMethod = request.method;
          return new HttpResponse(null, { status: 204 });
        })
      );

      await metadataClient.updateOneToManyRelationship("new_account_contact", {
        "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      });

      expect(capturedMethod).toBe("PUT");
    });
  });

  describe("Global Choice Operations", () => {
    it("should create global option set", async () => {
      server.use(
        http.post(`${BASE_URL}/GlobalOptionSetDefinitions`, async ({ request }) => {
          expect(request.method).toBe("POST");
          const body = (await request.json()) as any;
          expect(body["@odata.type"]).toBe("Microsoft.Dynamics.CRM.OptionSetMetadata");

          return HttpResponse.json({ MetadataId: "optionset-id" }, { status: 201 });
        })
      );

      const optionSetId = await metadataClient.createGlobalOptionSet({
        "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
        Name: "new_status",
        DisplayName: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: "Status",
              LanguageCode: 1033,
            },
          ],
        },
        OptionSetType: "Picklist",
      });

      expect(optionSetId).toBe("optionset-id");
    });

    it("should update global option set using PUT", async () => {
      let capturedMethod = "";

      server.use(
        http.put(`${BASE_URL}/GlobalOptionSetDefinitions*`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.pathname).toContain(
            "GlobalOptionSetDefinitions(12345678-1234-1234-1234-123456789abc)"
          );
          capturedMethod = request.method;
          return new HttpResponse(null, { status: 204 });
        })
      );

      await metadataClient.updateGlobalOptionSet("12345678-1234-1234-1234-123456789abc", {
        "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
      });

      expect(capturedMethod).toBe("PUT");
    });
  });

  describe("Option Value Operations (Unbound Actions)", () => {
    it("should call InsertOptionValue as unbound action", async () => {
      server.use(
        http.post(`${BASE_URL}/InsertOptionValue`, async ({ request }) => {
          expect(request.method).toBe("POST");
          const body = (await request.json()) as any;
          expect(body.EntityLogicalName).toBe("account");
          expect(body.AttributeLogicalName).toBe("statuscode");

          return HttpResponse.json({ NewOptionValue: 100000 });
        })
      );

      const result = await metadataClient.insertOptionValue({
        EntityLogicalName: "account",
        AttributeLogicalName: "statuscode",
        Value: 100000,
        Label: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: "New Status",
              LanguageCode: 1033,
            },
          ],
        },
      });

      expect(result.NewOptionValue).toBe(100000);
    });

    it("should call UpdateOptionValue as unbound action", async () => {
      server.use(
        http.post(`${BASE_URL}/UpdateOptionValue`, ({ request }) => {
          expect(request.method).toBe("POST");
          return new HttpResponse(null, { status: 204 });
        })
      );

      await metadataClient.updateOptionValue({
        EntityLogicalName: "account",
        AttributeLogicalName: "statuscode",
        Value: 100000,
        Label: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: "Updated Status",
              LanguageCode: 1033,
            },
          ],
        },
        MergeLabels: true,
      });
    });
  });

  describe("RetrieveMetadataChanges", () => {
    it("should call RetrieveMetadataChanges action with query", async () => {
      server.use(
        http.post(`${BASE_URL}/RetrieveMetadataChanges`, async ({ request }) => {
          expect(request.method).toBe("POST");
          const body = (await request.json()) as any;
          expect(body.Query).toBeDefined();

          return HttpResponse.json({
            EntityMetadata: [],
            ServerVersionStamp: "version-123",
          });
        })
      );

      const result = await metadataClient.retrieveMetadataChanges({
        Query: {
          Criteria: {
            Conditions: [
              {
                PropertyName: "LogicalName",
                ConditionOperator: "Equals",
                Value: { Value: "account" },
              },
            ],
          },
          Properties: { PropertyNames: ["LogicalName", "SchemaName"] },
        },
      });

      expect(result.ServerVersionStamp).toBe("version-123");
    });
  });

  describe("PUT Method Verification (Critical)", () => {
    it("should use PUT (not PATCH) for all metadata update operations", async () => {
      const methodsUsed: string[] = [];

      // Track all PUT requests
      server.use(
        http.put(`${BASE_URL}/*`, ({ request }) => {
          const url = new URL(request.url);
          const path = url.pathname;

          if (
            path.includes("EntityDefinitions(LogicalName='test')") &&
            !path.includes("/Attributes")
          ) {
            methodsUsed.push(`entity-${request.method}`);
          } else if (path.includes("/Attributes(LogicalName='testattr')")) {
            methodsUsed.push(`attribute-${request.method}`);
          } else if (path.includes("RelationshipDefinitions(SchemaName='test_rel')")) {
            methodsUsed.push(`relationship-${request.method}`);
          } else if (path.includes("GlobalOptionSetDefinitions")) {
            methodsUsed.push(`optionset-${request.method}`);
          }

          return new HttpResponse(null, { status: 204 });
        })
      );

      // Execute all update operations
      await metadataClient.updateEntityDefinition("test", {
        "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
      });
      await metadataClient.updateAttributeDefinition("test", "testattr", {
        "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      });
      await metadataClient.updateOneToManyRelationship("test_rel", {
        "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      });
      await metadataClient.updateGlobalOptionSet("test-guid", {
        "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
      });

      // Verify all used PUT
      expect(methodsUsed).toEqual([
        "entity-PUT",
        "attribute-PUT",
        "relationship-PUT",
        "optionset-PUT",
      ]);
    });
  });
});
