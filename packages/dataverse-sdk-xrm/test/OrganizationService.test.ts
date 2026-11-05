import { describe, it, expect, beforeEach as _beforeEach, vi } from "vitest";
import { OrganizationService } from "../src/OrganizationService.js";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

// Mock DataverseClient
const createMockClient = () => {
  const mockApi = vi.fn();
  const mockRequestBuilder = {
    select: vi.fn().mockReturnThis(),
    expand: vi.fn().mockReturnThis(),
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  };

  mockApi.mockReturnValue(mockRequestBuilder);

  return {
    client: {
      api: mockApi,
    } as unknown as DataverseClient,
    mockApi,
    mockRequestBuilder,
  };
};

describe("OrganizationService", () => {
  describe("create", () => {
    it("should create entity and return ID from OData-EntityId header", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        headers: {
          get: (key: string) => {
            if (key === "OData-EntityId") {
              return "https://org.crm.dynamics.com/api/data/v9.2/accounts(12345678-1234-1234-1234-123456789012)";
            }
            return null;
          },
        },
      };
      mockRequestBuilder.post.mockResolvedValue(mockResponse);

      const id = await service.create("accounts", { name: "Test Account" });

      expect(mockApi).toHaveBeenCalledWith("/accounts");
      expect(mockRequestBuilder.post).toHaveBeenCalledWith({ name: "Test Account" }, {});
      expect(id).toBe("12345678-1234-1234-1234-123456789012");
    });

    it("should support returnRepresentation option", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const entity = { accountid: "123", name: "Test Account" };
      const mockResponse = {
        headers: new Map(),
        text: vi.fn().mockResolvedValue(JSON.stringify(entity)),
      };
      mockRequestBuilder.post.mockResolvedValue(mockResponse);

      const result = await service.create(
        "accounts",
        { name: "Test Account" },
        {
          returnRepresentation: true,
          select: ["accountid", "name"],
        }
      );

      expect(mockRequestBuilder.select).toHaveBeenCalledWith("accountid", "name");
      expect(mockRequestBuilder.post).toHaveBeenCalledWith(
        { name: "Test Account" },
        { Prefer: "return=representation" }
      );
      expect(result).toEqual(entity);
    });

    it("should support suppressDuplicateDetection option", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        headers: {
          get: (key: string) => {
            if (key === "OData-EntityId") {
              return "https://org.crm.dynamics.com/api/data/v9.2/accounts(12345678-1234-1234-1234-123456789012)";
            }
            return null;
          },
        },
      };
      mockRequestBuilder.post.mockResolvedValue(mockResponse);

      await service.create(
        "accounts",
        { name: "Test" },
        {
          suppressDuplicateDetection: true,
        }
      );

      expect(mockRequestBuilder.post).toHaveBeenCalledWith(
        { name: "Test" },
        { "MSCRM.SuppressDuplicateDetection": "true" }
      );
    });

    it("should support impersonation", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        headers: {
          get: (key: string) => {
            if (key === "OData-EntityId") {
              return "https://org.crm.dynamics.com/api/data/v9.2/accounts(12345678-1234-1234-1234-123456789012)";
            }
            return null;
          },
        },
      };
      mockRequestBuilder.post.mockResolvedValue(mockResponse);

      const userId = "99999999-9999-9999-9999-999999999999";
      await service.create(
        "accounts",
        { name: "Test" },
        {
          impersonateUserId: userId,
        }
      );

      expect(mockRequestBuilder.post).toHaveBeenCalledWith(
        { name: "Test" },
        { MSCRMCallerID: userId }
      );
    });
  });

  describe("retrieve", () => {
    it("should retrieve entity by ID", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const entity = { accountid: "123", name: "Test Account" };
      const mockResponse = {
        text: vi.fn().mockResolvedValue(JSON.stringify(entity)),
      };
      mockRequestBuilder.get.mockResolvedValue(mockResponse);

      const result = await service.retrieve("accounts", "12345678-1234-1234-1234-123456789012");

      expect(mockApi).toHaveBeenCalledWith("/accounts(12345678-1234-1234-1234-123456789012)");
      expect(mockRequestBuilder.get).toHaveBeenCalledWith({});
      expect(result).toEqual(entity);
    });

    it("should normalize GUIDs with braces", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        text: vi.fn().mockResolvedValue(JSON.stringify({})),
      };
      mockRequestBuilder.get.mockResolvedValue(mockResponse);

      await service.retrieve("accounts", "{12345678-1234-1234-1234-123456789012}");

      expect(mockApi).toHaveBeenCalledWith("/accounts(12345678-1234-1234-1234-123456789012)");
    });

    it("should support select option", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        text: vi.fn().mockResolvedValue(JSON.stringify({})),
      };
      mockRequestBuilder.get.mockResolvedValue(mockResponse);

      await service.retrieve("accounts", "123", {
        select: ["name", "telephone1", "revenue"],
      });

      expect(mockRequestBuilder.select).toHaveBeenCalledWith("name", "telephone1", "revenue");
    });

    it("should support expand option with string", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        text: vi.fn().mockResolvedValue(JSON.stringify({})),
      };
      mockRequestBuilder.get.mockResolvedValue(mockResponse);

      await service.retrieve("accounts", "123", {
        expand: "primarycontactid",
      });

      expect(mockRequestBuilder.expand).toHaveBeenCalledWith("primarycontactid");
    });

    it("should support expand option with object", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        text: vi.fn().mockResolvedValue(JSON.stringify({})),
      };
      mockRequestBuilder.get.mockResolvedValue(mockResponse);

      await service.retrieve("accounts", "123", {
        expand: [
          {
            navigationProperty: "primarycontactid",
            select: ["fullname", "emailaddress1"],
            filter: "statecode eq 0",
            top: 1,
          },
        ],
      });

      expect(mockRequestBuilder.expand).toHaveBeenCalledWith("primarycontactid", {
        select: ["fullname", "emailaddress1"],
        filter: "statecode eq 0",
        top: 1,
      });
    });

    it("should support impersonation", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        text: vi.fn().mockResolvedValue(JSON.stringify({})),
      };
      mockRequestBuilder.get.mockResolvedValue(mockResponse);

      const userId = "99999999-9999-9999-9999-999999999999";
      await service.retrieve("accounts", "123", {
        impersonateUserId: userId,
      });

      expect(mockRequestBuilder.get).toHaveBeenCalledWith({
        MSCRMCallerID: userId,
      });
    });
  });

  describe("update", () => {
    it("should update entity", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.patch.mockResolvedValue({});

      await service.update("accounts", "12345678-1234-1234-1234-123456789012", {
        name: "Updated Name",
      });

      expect(mockApi).toHaveBeenCalledWith("/accounts(12345678-1234-1234-1234-123456789012)");
      expect(mockRequestBuilder.patch).toHaveBeenCalledWith({ name: "Updated Name" }, {});
    });

    it("should support etag for optimistic concurrency", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.patch.mockResolvedValue({});

      await service.update(
        "accounts",
        "123",
        { name: "Updated" },
        {
          etag: 'W/"12345678"',
        }
      );

      expect(mockRequestBuilder.patch).toHaveBeenCalledWith(
        { name: "Updated" },
        { "If-Match": 'W/"12345678"' }
      );
    });

    it("should support returnRepresentation option", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const entity = { accountid: "123", name: "Updated Name" };
      const mockResponse = {
        text: vi.fn().mockResolvedValue(JSON.stringify(entity)),
      };
      mockRequestBuilder.patch.mockResolvedValue(mockResponse);

      const result = await service.update(
        "accounts",
        "123",
        { name: "Updated Name" },
        {
          returnRepresentation: true,
          select: ["accountid", "name", "modifiedon"],
        }
      );

      expect(mockRequestBuilder.select).toHaveBeenCalledWith("accountid", "name", "modifiedon");
      expect(mockRequestBuilder.patch).toHaveBeenCalledWith(
        { name: "Updated Name" },
        { Prefer: "return=representation" }
      );
      expect(result).toEqual(entity);
    });

    it("should support suppressDuplicateDetection option", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.patch.mockResolvedValue({});

      await service.update(
        "accounts",
        "123",
        { name: "Updated" },
        {
          suppressDuplicateDetection: true,
        }
      );

      expect(mockRequestBuilder.patch).toHaveBeenCalledWith(
        { name: "Updated" },
        { "MSCRM.SuppressDuplicateDetection": "true" }
      );
    });

    it("should support impersonation", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.patch.mockResolvedValue({});

      const userId = "99999999-9999-9999-9999-999999999999";
      await service.update(
        "accounts",
        "123",
        { name: "Updated" },
        {
          impersonateUserId: userId,
        }
      );

      expect(mockRequestBuilder.patch).toHaveBeenCalledWith(
        { name: "Updated" },
        { MSCRMCallerID: userId }
      );
    });
  });

  describe("delete", () => {
    it("should delete entity by ID", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.delete.mockResolvedValue({});

      await service.delete("accounts", "12345678-1234-1234-1234-123456789012");

      expect(mockApi).toHaveBeenCalledWith("/accounts(12345678-1234-1234-1234-123456789012)");
      expect(mockRequestBuilder.delete).toHaveBeenCalledWith({});
    });

    it("should support etag for optimistic concurrency", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.delete.mockResolvedValue({});

      await service.delete("accounts", "123", {
        etag: 'W/"12345678"',
      });

      expect(mockRequestBuilder.delete).toHaveBeenCalledWith({
        "If-Match": 'W/"12345678"',
      });
    });

    it("should support impersonation", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.delete.mockResolvedValue({});

      const userId = "99999999-9999-9999-9999-999999999999";
      await service.delete("accounts", "123", {
        impersonateUserId: userId,
      });

      expect(mockRequestBuilder.delete).toHaveBeenCalledWith({
        MSCRMCallerID: userId,
      });
    });
  });

  describe("associate", () => {
    it("should associate entities", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.post.mockResolvedValue({});

      await service.associate("accounts", "123", "contact_customer_accounts", [
        { logicalName: "contact", id: "contact1" },
        { logicalName: "contact", id: "contact2" },
      ]);

      expect(mockApi).toHaveBeenCalledWith("/accounts(123)/contact_customer_accounts/$ref");
      expect(mockRequestBuilder.post).toHaveBeenCalledTimes(2);
      expect(mockRequestBuilder.post).toHaveBeenNthCalledWith(
        1,
        { "@odata.id": "contacts(contact1)" },
        {}
      );
      expect(mockRequestBuilder.post).toHaveBeenNthCalledWith(
        2,
        { "@odata.id": "contacts(contact2)" },
        {}
      );
    });

    it("should normalize GUIDs in associate", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.post.mockResolvedValue({});

      await service.associate("accounts", "{ACCOUNT-ID}", "relationship", [
        { logicalName: "contact", id: "{CONTACT-ID}" },
      ]);

      expect(mockApi).toHaveBeenCalledWith("/accounts(account-id)/relationship/$ref");
      expect(mockRequestBuilder.post).toHaveBeenCalledWith(
        { "@odata.id": "contacts(contact-id)" },
        {}
      );
    });

    it("should support impersonation", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.post.mockResolvedValue({});

      const userId = "99999999-9999-9999-9999-999999999999";
      await service.associate(
        "accounts",
        "123",
        "relationship",
        [{ logicalName: "contact", id: "contact1" }],
        {
          impersonateUserId: userId,
        }
      );

      expect(mockRequestBuilder.post).toHaveBeenCalledWith(
        { "@odata.id": "contacts(contact1)" },
        { MSCRMCallerID: userId }
      );
    });
  });

  describe("disassociate", () => {
    it("should disassociate with specific related ID", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.delete.mockResolvedValue({});

      await service.disassociate("accounts", "123", "contact_customer_accounts", "contact1");

      expect(mockApi).toHaveBeenCalledWith(
        "/accounts(123)/contact_customer_accounts(contact1)/$ref"
      );
      expect(mockRequestBuilder.delete).toHaveBeenCalledWith({});
    });

    it("should disassociate without related ID (clear single-valued navigation)", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.delete.mockResolvedValue({});

      await service.disassociate("opportunities", "123", "parentaccountid");

      expect(mockApi).toHaveBeenCalledWith("/opportunities(123)/parentaccountid/$ref");
      expect(mockRequestBuilder.delete).toHaveBeenCalledWith({});
    });

    it("should normalize GUIDs in disassociate", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.delete.mockResolvedValue({});

      await service.disassociate("accounts", "{ACCOUNT-ID}", "relationship", "{CONTACT-ID}");

      expect(mockApi).toHaveBeenCalledWith("/accounts(account-id)/relationship(contact-id)/$ref");
    });

    it("should support impersonation", async () => {
      const { client, mockApi: _mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      mockRequestBuilder.delete.mockResolvedValue({});

      const userId = "99999999-9999-9999-9999-999999999999";
      await service.disassociate("accounts", "123", "relationship", "related1", {
        impersonateUserId: userId,
      });

      expect(mockRequestBuilder.delete).toHaveBeenCalledWith({
        MSCRMCallerID: userId,
      });
    });
  });

  describe("execute", () => {
    it("should execute WhoAmI function (GET)", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const whoAmIData = {
        UserId: "12345678-1234-1234-1234-123456789012",
        BusinessUnitId: "87654321-4321-4321-4321-210987654321",
        OrganizationId: "11111111-1111-1111-1111-111111111111",
      };
      mockRequestBuilder.get.mockResolvedValue(whoAmIData);

      const response = await service.whoAmI();

      expect(mockApi).toHaveBeenCalledWith("/WhoAmI");
      expect(mockRequestBuilder.get).toHaveBeenCalled();
      expect(response.UserId).toBe("12345678-1234-1234-1234-123456789012");
      expect(response.BusinessUnitId).toBe("87654321-4321-4321-4321-210987654321");
      expect(response.OrganizationId).toBe("11111111-1111-1111-1111-111111111111");
    });

    it("should assign a record to a user", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        status: 204,
      };
      mockRequestBuilder.patch.mockResolvedValue(mockResponse);

      await service.assign("account", "account-id", "user-id", "systemuser");

      expect(mockApi).toHaveBeenCalledWith("/accounts(account-id)");
      expect(mockRequestBuilder.patch).toHaveBeenCalledWith({
        "ownerid@odata.bind": "/systemusers(user-id)",
      });
    });

    it("should set state and status of a record", async () => {
      const { client, mockApi, mockRequestBuilder } = createMockClient();
      const service = new OrganizationService(client);

      const mockResponse = {
        status: 204,
      };
      mockRequestBuilder.patch.mockResolvedValue(mockResponse);

      await service.setState("account", "account-id", 1, 2);

      expect(mockApi).toHaveBeenCalledWith("/accounts(account-id)");
      expect(mockRequestBuilder.patch).toHaveBeenCalledWith({
        statecode: 1,
        statuscode: 2,
      });
    });
  });
});
