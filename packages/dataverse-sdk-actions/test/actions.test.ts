import { describe, it, expect } from "vitest";
import {
  ExecuteWorkflowAction,
  WinOpportunityAction,
  MergeAction,
  CreateMultipleAction,
  UpdateMultipleAction,
  UpsertMultipleAction,
  DeleteMultipleAction,
  InitializeFileBlocksUploadAction,
  UploadBlockAction,
  CommitFileBlocksUploadAction,
} from "../src/index.js";

describe("Business Actions", () => {
  describe("ExecuteWorkflowAction", () => {
    it("should create correct request for bound workflow execution", () => {
      const action = new ExecuteWorkflowAction("{00000000-0000-0000-0000-0000000000f1}", {
        EntityId: "entity-guid",
        InputArguments: {},
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe(
        "https://org.crm.dynamics.com/api/data/v9.2/workflows(00000000-0000-0000-0000-0000000000f1)/Microsoft.Dynamics.CRM.ExecuteWorkflow"
      );
      expect(requestInfo.body).toEqual({
        EntityId: "entity-guid",
        InputArguments: {},
      });
    });

    it("should parse the asyncoperation the response body is (#71)", async () => {
      const action = new ExecuteWorkflowAction("{00000000-0000-0000-0000-0000000000f1}", {
        EntityId: "entity-guid",
        InputArguments: {},
      });
      const mockResponse = new Response(
        JSON.stringify({
          "@odata.context": "$metadata#asyncoperations/$entity",
          asyncoperationid: "async-operation-guid",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

      const response = await action.parseResponse(mockResponse);

      expect(response.asyncoperationid).toBe("async-operation-guid");
    });
  });

  describe("WinOpportunityAction", () => {
    it("should create correct request with all required parameters", () => {
      const opportunityClose = {
        "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
        subject: "Won - Contoso Deal",
      };
      const action = new WinOpportunityAction({
        OpportunityClose: opportunityClose,
        Caller: "user-guid",
        Status: 3,
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe("https://org.crm.dynamics.com/api/data/v9.2/WinOpportunity");
      expect(requestInfo.body).toEqual({
        OpportunityClose: opportunityClose,
        Caller: "user-guid",
        Status: 3,
      });
    });

    it("should pass status parameter correctly", () => {
      const opportunityClose = {
        "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
        subject: "Won",
      };
      const action = new WinOpportunityAction({
        OpportunityClose: opportunityClose,
        Caller: "user-guid",
        Status: 5,
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.body).toHaveProperty("Status", 5);
      expect(requestInfo.body).toHaveProperty("Caller", "user-guid");
    });
  });

  describe("MergeAction", () => {
    it("should create correct request with all parameters", () => {
      const target = { logicalName: "account", id: "target-guid" };
      const subordinate = { logicalName: "account", id: "subordinate-guid" };
      const updateContent = { logicalName: "account", id: "target-guid" };
      const action = new MergeAction({
        Target: target,
        Subordinate: subordinate,
        UpdateContent: updateContent,
        PerformParentingChecks: true,
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe("https://org.crm.dynamics.com/api/data/v9.2/Merge");
      expect(requestInfo.body).toEqual({
        Target: target,
        Subordinate: subordinate,
        UpdateContent: updateContent,
        PerformParentingChecks: true,
      });
    });

    it("should pass PerformParentingChecks parameter", () => {
      const target = { logicalName: "contact", id: "target-guid" };
      const subordinate = { logicalName: "contact", id: "subordinate-guid" };
      const updateContent = { logicalName: "contact", id: "target-guid" };
      const action = new MergeAction({
        Target: target,
        Subordinate: subordinate,
        UpdateContent: updateContent,
        PerformParentingChecks: false,
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.body).toHaveProperty("PerformParentingChecks", false);
      expect(requestInfo.body).toHaveProperty("Target", target);
      expect(requestInfo.body).toHaveProperty("Subordinate", subordinate);
      expect(requestInfo.body).toHaveProperty("UpdateContent", updateContent);
    });
  });
});

describe("Bulk Operations", () => {
  describe("CreateMultipleAction", () => {
    it("should create correct request", () => {
      const accounts = [
        { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
        { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Fabrikam" },
      ];
      const action = new CreateMultipleAction("accounts", { Targets: accounts });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe(
        "https://org.crm.dynamics.com/api/data/v9.2/accounts/Microsoft.Dynamics.CRM.CreateMultiple"
      );
      expect(requestInfo.body).toEqual({
        Targets: accounts,
      });
    });

    it("should accept targets array", () => {
      const accounts = [{ "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Test" }];
      const action = new CreateMultipleAction("accounts", { Targets: accounts });

      expect(action.parameters.Targets).toEqual(accounts);
    });

    it("should parse response with Ids", async () => {
      const accounts = [{ "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" }];
      const action = new CreateMultipleAction("accounts", { Targets: accounts });
      const mockResponse = new Response(JSON.stringify({ Ids: ["id1", "id2"] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

      const response = await action.parseResponse(mockResponse);

      expect(response.Ids).toEqual(["id1", "id2"]);
    });
  });

  describe("UpdateMultipleAction", () => {
    it("should create correct request", () => {
      const updates = [
        { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id1", creditlimit: 50000 },
      ];
      const action = new UpdateMultipleAction("accounts", { Targets: updates });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe(
        "https://org.crm.dynamics.com/api/data/v9.2/accounts/Microsoft.Dynamics.CRM.UpdateMultiple"
      );
      expect(requestInfo.body).toEqual({
        Targets: updates,
      });
    });

    it("should accept targets array", () => {
      const updates = [{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id1" }];
      const action = new UpdateMultipleAction("accounts", { Targets: updates });

      expect(action.parameters.Targets).toEqual(updates);
    });
  });

  describe("UpsertMultipleAction", () => {
    it("should create correct request", () => {
      const records = [
        { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id1", name: "Updated" },
        { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "New" },
      ];
      const action = new UpsertMultipleAction("accounts", { Targets: records });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe(
        "https://org.crm.dynamics.com/api/data/v9.2/accounts/Microsoft.Dynamics.CRM.UpsertMultiple"
      );
      expect(requestInfo.body).toEqual({
        Targets: records,
      });
    });

    it("should accept targets array", () => {
      const records = [{ "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Test" }];
      const action = new UpsertMultipleAction("accounts", { Targets: records });

      expect(action.parameters.Targets).toEqual(records);
    });
  });

  describe("DeleteMultipleAction", () => {
    it("should create correct request", () => {
      const targets = [
        { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id1" },
        { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id2" },
      ];
      const action = new DeleteMultipleAction("accounts", { Targets: targets });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe(
        "https://org.crm.dynamics.com/api/data/v9.2/accounts/Microsoft.Dynamics.CRM.DeleteMultiple"
      );
      expect(requestInfo.body).toEqual({
        Targets: targets,
      });
    });

    it("should accept targets array", () => {
      const targets = [{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "id1" }];
      const action = new DeleteMultipleAction("accounts", { Targets: targets });

      expect(action.parameters.Targets).toEqual(targets);
    });
  });
});

describe("File Operations", () => {
  describe("InitializeFileBlocksUploadAction", () => {
    it("should create correct request", () => {
      const target = { logicalName: "account", id: "account-guid" };
      const action = new InitializeFileBlocksUploadAction({
        Target: target,
        FileName: "logo.png",
        FileAttributeName: "new_logo",
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe(
        "https://org.crm.dynamics.com/api/data/v9.2/InitializeFileBlocksUpload"
      );
      expect(requestInfo.body).toEqual({
        Target: target,
        FileName: "logo.png",
        FileAttributeName: "new_logo",
      });
    });

    it("should parse response with continuation token", async () => {
      const target = { logicalName: "account", id: "account-guid" };
      const action = new InitializeFileBlocksUploadAction({
        Target: target,
        FileName: "logo.png",
        FileAttributeName: "new_logo",
      });
      const mockResponse = new Response(JSON.stringify({ FileContinuationToken: "token-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

      const response = await action.parseResponse(mockResponse);

      expect(response.FileContinuationToken).toBe("token-123");
    });
  });

  describe("UploadBlockAction", () => {
    it("should create correct request", () => {
      const action = new UploadBlockAction({
        BlockId: "AAAAAA==",
        BlockData: "base64-data",
        FileContinuationToken: "token-123",
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe("https://org.crm.dynamics.com/api/data/v9.2/UploadBlock");
      expect(requestInfo.body).toEqual({
        BlockId: "AAAAAA==",
        BlockData: "base64-data",
        FileContinuationToken: "token-123",
      });
    });
  });

  describe("CommitFileBlocksUploadAction", () => {
    it("should create correct request", () => {
      const blockList = ["AAAAAA==", "AQAAAA=="];
      const action = new CommitFileBlocksUploadAction({
        FileName: "logo.png",
        MimeType: "image/png",
        BlockList: blockList,
        FileContinuationToken: "token-123",
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("POST");
      expect(requestInfo.url).toBe(
        "https://org.crm.dynamics.com/api/data/v9.2/CommitFileBlocksUpload"
      );
      expect(requestInfo.body).toEqual({
        FileName: "logo.png",
        MimeType: "image/png",
        BlockList: blockList,
        FileContinuationToken: "token-123",
      });
    });

    it("should include all parameters in body", () => {
      const blockList = ["AAAAAA=="];
      const action = new CommitFileBlocksUploadAction({
        FileName: "document.pdf",
        MimeType: "application/pdf",
        BlockList: blockList,
        FileContinuationToken: "token-456",
      });
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = action.toRequestInformation(baseUrl);

      expect(requestInfo.body).toHaveProperty("FileName", "document.pdf");
      expect(requestInfo.body).toHaveProperty("MimeType", "application/pdf");
      expect(requestInfo.body).toHaveProperty("BlockList", blockList);
      expect(requestInfo.body).toHaveProperty("FileContinuationToken", "token-456");
    });
  });
});
