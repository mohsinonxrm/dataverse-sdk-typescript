import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { contract } from "./types/index.js";

/**
 * Parameters of the RenewContract message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RenewContractRequestParameters {
  Status: number;
  IncludeCanceledLines: boolean;
}

/**
 * RenewContract request message
 *
 * Web API Action: RenewContract
 *
 * The first argument is the id of the contract record to call it on.
 */
export class RenewContractRequest
  extends OrganizationRequest
  implements Executable<RenewContractResponse>
{
  declare readonly Parameters: Readonly<RenewContractRequestParameters>;

  constructor(
    public contractId: string,
    parameters: RenewContractRequestParameters
  ) {
    super("RenewContract", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.RenewContract`;

    const body = requestBody({
      Status: this.Parameters.Status,
      IncludeCanceledLines: this.Parameters.IncludeCanceledLines,
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

  async parseResponse(response: Response): Promise<RenewContractResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RenewContractResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * RenewContract response message
 */
export class RenewContractResponse extends OrganizationResponse {
  constructor(public result: contract) {
    super("RenewContract");
  }

  static fromResponse(data: unknown): RenewContractResponse {
    return new RenewContractResponse(responseObject<contract>(data));
  }
}
