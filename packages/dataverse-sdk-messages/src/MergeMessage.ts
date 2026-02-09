import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * Merge request message
 *
 * Web API Action: Merge
 */
export class MergeRequest extends OrganizationRequest implements Executable<MergeResponse> {
  constructor(
    public target: EntityReference,
    public subordinate: EntityReference,
    public updateContent: EntityReference,
    public performParentingChecks: boolean
  ) {
    super("Merge");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Merge`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Subordinate: this.subordinate,
      UpdateContent: this.updateContent,
      PerformParentingChecks: this.performParentingChecks,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<MergeResponse> {
    // No return value (204 No Content)
    return new MergeResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      Subordinate: this.subordinate,
      UpdateContent: this.updateContent,
      PerformParentingChecks: this.performParentingChecks,
    };
  }
}

/**
 * Merge response message
 */
export class MergeResponse extends OrganizationResponse {
  constructor() {
    super("Merge");
  }

  static fromResponse(_data: unknown): MergeResponse {
    return new MergeResponse();
  }
}
