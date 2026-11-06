import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CancelContract message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CancelContractRequestParameters {
  CancelDate: string;
  Status: number;
}

/**
 * CancelContract request message
 *
 * Web API Action: CancelContract
 *
 * The first argument is the id of the contract record to call it on.
 */
export class CancelContractRequest
  extends OrganizationRequest
  implements Executable<CancelContractResponse>
{
  declare readonly Parameters: Readonly<CancelContractRequestParameters>;

  constructor(
    public contractId: string,
    parameters: CancelContractRequestParameters
  ) {
    super("CancelContract", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.CancelContract`;

    const body = requestBody({
      CancelDate: this.Parameters.CancelDate,
      Status: this.Parameters.Status,
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

  async parseResponse(response: Response): Promise<CancelContractResponse> {
    // No return value (204 No Content)
    return new CancelContractResponse();
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
