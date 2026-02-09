import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaShareConnection request message
 *
 * Web API Action: PvaShareConnection
 */
export class PvaShareConnectionRequest
  extends OrganizationRequest
  implements Executable<PvaShareConnectionResponse>
{
  constructor(public connectionreferenceId: string) {
    super("PvaShareConnection");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectionreferences(${this.connectionreferenceId})/Microsoft.Dynamics.CRM.PvaShareConnection`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaShareConnectionResponse> {
    // No return value (204 No Content)
    return new PvaShareConnectionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.connectionreferenceId,
    };
  }
}

/**
 * PvaShareConnection response message
 */
export class PvaShareConnectionResponse extends OrganizationResponse {
  constructor() {
    super("PvaShareConnection");
  }

  static fromResponse(_data: unknown): PvaShareConnectionResponse {
    return new PvaShareConnectionResponse();
  }
}
