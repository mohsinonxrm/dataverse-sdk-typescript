import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the Merge message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface MergeRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  Subordinate: EntityReference | AnyEntityPayload;
  UpdateContent?: EntityReference | AnyEntityPayload;
  PerformParentingChecks: boolean;
}

/**
 * Merge request message
 *
 * Web API Action: Merge
 */
export class MergeRequest extends OrganizationRequest implements Executable<MergeResponse> {
  declare readonly Parameters: Readonly<MergeRequestParameters>;

  constructor(parameters: MergeRequestParameters) {
    super("Merge", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Merge`;

    const body = requestBody({
      Target: this.Parameters.Target,
      Subordinate: this.Parameters.Subordinate,
      UpdateContent: this.Parameters.UpdateContent,
      PerformParentingChecks: this.Parameters.PerformParentingChecks,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<MergeResponse> {
    // No return value (204 No Content)
    return new MergeResponse();
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
