import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RestoreResponse> {
    const data = await response.json();
    return RestoreResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
    };
  }
}

/**
 * Restore response message
 */
export class RestoreResponse extends OrganizationResponse {
  constructor(public result: RestoreResponse) {
    super("Restore");
  }

  static fromResponse(data: unknown): RestoreResponse {
    return new RestoreResponse((data as any).value);
  }
}
