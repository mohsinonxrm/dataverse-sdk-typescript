import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { contract } from "./types/index.js";

/**
 * Parameters of the CloneContract message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneContractRequestParameters {
  IncludeCanceledLines: boolean;
}

/**
 * CloneContract request message
 *
 * Web API Action: CloneContract
 *
 * The first argument is the id of the contract record to call it on.
 */
export class CloneContractRequest
  extends OrganizationRequest
  implements Executable<CloneContractResponse>
{
  declare readonly Parameters: Readonly<CloneContractRequestParameters>;

  constructor(
    public contractId: string,
    parameters: CloneContractRequestParameters
  ) {
    super("CloneContract", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.CloneContract`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CloneContractResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CloneContractResponse.fromResponse({});
    return CloneContractResponse.fromResponse(await response.json());
  }
}

/**
 * CloneContract response message
 */
export class CloneContractResponse extends OrganizationResponse {
  constructor(public result: contract) {
    super("CloneContract");
  }

  static fromResponse(data: unknown): CloneContractResponse {
    return new CloneContractResponse(responseObject<contract>(data));
  }
}
