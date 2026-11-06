import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { contract } from "./types/index.js";

/**
 * RenewContract request message
 *
 * Web API Action: RenewContract
 */
export class RenewContractRequest
  extends OrganizationRequest
  implements Executable<RenewContractResponse>
{
  constructor(
    public contractId: string,
    public status: number,
    public includeCanceledLines: boolean
  ) {
    super("RenewContract");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.RenewContract`;

    const body: Record<string, unknown> = {
      Status: this.status,
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

  async parseResponse(response: Response): Promise<RenewContractResponse> {
    const data = await response.json();
    return RenewContractResponse.fromResponse(data);
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
