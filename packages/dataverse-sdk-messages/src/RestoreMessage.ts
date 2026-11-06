import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { RestoreResponse as RestoreResponseData } from "./types/index.js";

/**
 * Restore request message
 *
 * Web API Action: Restore
 */
export class RestoreRequest extends OrganizationRequest implements Executable<RestoreResponse> {
  constructor(public target: EntityReference) {
    super("Restore");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Restore`;

    const body: Record<string, unknown> = {
      Target: this.target,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RestoreResponse> {
    const data = await response.json();
    return RestoreResponse.fromResponse(data);
  }
}

/**
 * Restore response message
 */
export class RestoreResponse extends OrganizationResponse {
  constructor(public result: RestoreResponseData) {
    super("Restore");
  }

  static fromResponse(data: unknown): RestoreResponse {
    return new RestoreResponse(responseObject<RestoreResponseData>(data));
  }
}
