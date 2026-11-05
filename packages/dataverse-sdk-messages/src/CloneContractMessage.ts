import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { contract } from "./types/index.js";

/**
 * CloneContract request message
 *
 * Web API Action: CloneContract
 */
export class CloneContractRequest
  extends OrganizationRequest
  implements Executable<CloneContractResponse>
{
  constructor(
    public contractId: string,
    public includeCanceledLines: boolean
  ) {
    super("CloneContract");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.CloneContract`;

    const body: Record<string, unknown> = {
      IncludeCanceledLines: this.includeCanceledLines,
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

  async parseResponse(response: Response): Promise<CloneContractResponse> {
    const data = await response.json();
    return CloneContractResponse.fromResponse(data);
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
