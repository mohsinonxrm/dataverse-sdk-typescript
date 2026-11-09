import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaShareConnection request message
 *
 * Web API Action: PvaShareConnection
 *
 * The first argument is the id of the connectionreference record to call it on.
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
    const url = `${baseUrl}/connectionreferences(${odataLiteral.guid(this.connectionreferenceId)})/Microsoft.Dynamics.CRM.PvaShareConnection`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<PvaShareConnectionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new PvaShareConnectionResponse());
  }
}

/**
 * PvaShareConnection response message
 */
export class PvaShareConnectionResponse extends OrganizationResponse {
  constructor() {
    super("PvaShareConnection");
  }

  static fromResponse(_data?: unknown): PvaShareConnectionResponse {
    return new PvaShareConnectionResponse();
  }
}
