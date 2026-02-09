import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaProvision request message
 *
 * Web API Action: PvaProvision
 */
export class PvaProvisionRequest
  extends OrganizationRequest
  implements Executable<PvaProvisionResponse>
{
  constructor(public botId: string) {
    super("PvaProvision");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaProvision`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaProvisionResponse> {
    // No return value (204 No Content)
    return new PvaProvisionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.botId,
    };
  }
}

/**
 * PvaProvision response message
 */
export class PvaProvisionResponse extends OrganizationResponse {
  constructor() {
    super("PvaProvision");
  }

  static fromResponse(_data: unknown): PvaProvisionResponse {
    return new PvaProvisionResponse();
  }
}
