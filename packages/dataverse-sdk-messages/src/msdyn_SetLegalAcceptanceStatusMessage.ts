import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SetLegalAcceptanceStatus request message
 *
 * Web API Action: msdyn_SetLegalAcceptanceStatus
 */
export class msdyn_SetLegalAcceptanceStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetLegalAcceptanceStatusResponse>
{
  constructor(public status: boolean) {
    super("msdyn_SetLegalAcceptanceStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetLegalAcceptanceStatus`;

    const body: Record<string, unknown> = {
      Status: this.status,
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

  async parseResponse(response: Response): Promise<msdyn_SetLegalAcceptanceStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_SetLegalAcceptanceStatusResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Status: this.status,
    };
  }
}

/**
 * msdyn_SetLegalAcceptanceStatus response message
 */
export class msdyn_SetLegalAcceptanceStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SetLegalAcceptanceStatus");
  }

  static fromResponse(_data: unknown): msdyn_SetLegalAcceptanceStatusResponse {
    return new msdyn_SetLegalAcceptanceStatusResponse();
  }
}
