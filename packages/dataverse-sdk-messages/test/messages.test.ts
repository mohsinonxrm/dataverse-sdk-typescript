import { describe, it, expect } from "vitest";
import {
  OrganizationRequest,
  OrganizationResponse,
  ExecuteWorkflowRequest,
  ExecuteWorkflowResponse,
  WinOpportunityRequest,
  WinOpportunityResponse,
  MergeRequest,
  MergeResponse,
  PublishXmlRequest,
  PublishXmlResponse,
  PublishAllXmlRequest,
  PublishAllXmlResponse,
  createEntityReference,
} from "../src/index.js";

describe("OrganizationRequest/Response", () => {
  it("should create generic organization request", () => {
    const request = new OrganizationRequest("CustomAction", {
      StringParameter: "value",
      IntParameter: 42,
    });

    expect(request.messageName).toBe("CustomAction");
    expect(request.Parameters).toEqual({
      StringParameter: "value",
      IntParameter: 42,
    });
  });

  it("should create organization request with empty parameters", () => {
    const request = new OrganizationRequest("SimpleAction");

    expect(request.messageName).toBe("SimpleAction");
    expect(request.Parameters).toEqual({});
  });

  it("should create generic organization response", () => {
    const response = new OrganizationResponse("CustomAction", {
      OutputParameter: "result",
      Count: 10,
    });

    expect(response.messageName).toBe("CustomAction");
    expect(response.Results).toEqual({
      OutputParameter: "result",
      Count: 10,
    });
  });
});

// TODO: Add tests for WhoAmI, Assign, SetState when these message classes are implemented
// These are currently functions/actions in separate packages, not messages
// See packages/dataverse-sdk-functions/src/WhoAmIFunction.ts

describe("Message Classes", () => {
  // Note: These are basic smoke tests. The message classes are auto-generated
  // with complex constructor signatures. Full integration tests will verify
  // end-to-end functionality with actual Dataverse instances.

  describe("ExecuteWorkflowRequest/Response", () => {
    it("should create ExecuteWorkflow request with correct message name", () => {
      const request = new ExecuteWorkflowRequest("workflow-id", "entity-id", {});
      expect(request.messageName).toBe("ExecuteWorkflow");
    });

    it("should create ExecuteWorkflow response", () => {
      const response = new ExecuteWorkflowResponse({});
      expect(response.messageName).toBe("ExecuteWorkflow");
    });
  });

  describe("WinOpportunityRequest/Response", () => {
    it("should create WinOpportunity request with correct message name", () => {
      const request = new WinOpportunityRequest({}, "", 3);
      expect(request.messageName).toBe("WinOpportunity");
    });

    it("should create WinOpportunity response", () => {
      const response = new WinOpportunityResponse();
      expect(response.messageName).toBe("WinOpportunity");
    });
  });

  describe("MergeRequest/Response", () => {
    it("should create Merge request with correct message name", () => {
      const request = new MergeRequest(
        createEntityReference("account", "master-id"),
        createEntityReference("account", "subordinate-id"),
        undefined,
        false
      );
      expect(request.messageName).toBe("Merge");
    });

    it("should create Merge response", () => {
      const response = new MergeResponse();
      expect(response.messageName).toBe("Merge");
    });
  });

  describe("PublishXmlRequest/Response", () => {
    it("should create PublishXml request with correct message name", () => {
      const request = new PublishXmlRequest("<importexportxml></importexportxml>");
      expect(request.messageName).toBe("PublishXml");
    });

    it("should create PublishXml response", () => {
      const response = new PublishXmlResponse();
      expect(response.messageName).toBe("PublishXml");
    });
  });

  describe("PublishAllXmlRequest/Response", () => {
    it("should create PublishAllXml request with correct message name", () => {
      const request = new PublishAllXmlRequest();
      expect(request.messageName).toBe("PublishAllXml");
    });

    it("should create PublishAllXml response", () => {
      const response = new PublishAllXmlResponse();
      expect(response.messageName).toBe("PublishAllXml");
    });
  });
});

// TODO: Add tests for utility functions (normalizeOptionSetValue, normalizeGuid, encodeParameterAliases)
// when these are exported from the package index
