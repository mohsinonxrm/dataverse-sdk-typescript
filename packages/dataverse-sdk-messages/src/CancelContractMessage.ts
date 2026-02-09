import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CancelContract request message
 *
 * Web API Action: CancelContract
 */
export class CancelContractRequest
  extends OrganizationRequest
  implements Executable<CancelContractResponse>
{
  constructor(
    public contractId: string,
    public cancelDate: string,
    public status: number
  ) {
    super("CancelContract");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.CancelContract`;

    const body: Record<string, unknown> = {
      CancelDate: this.cancelDate,
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

  async parseResponse(response: Response): Promise<CancelContractResponse> {
    // No return value (204 No Content)
    return new CancelContractResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.contractId,
      CancelDate: this.cancelDate,
      Status: this.status,
    };
  }
}

/**
 * CancelContract response message
 */
export class CancelContractResponse extends OrganizationResponse {
  constructor() {
    super("CancelContract");
  }

  static fromResponse(_data: unknown): CancelContractResponse {
    return new CancelContractResponse();
  }
}
