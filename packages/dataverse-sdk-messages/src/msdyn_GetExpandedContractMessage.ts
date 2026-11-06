import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetExpandedContractResponse as msdyn_GetExpandedContractResponseData } from "./types/index.js";

/**
 * msdyn_GetExpandedContract request message
 *
 * Web API Action: msdyn_GetExpandedContract
 */
export class msdyn_GetExpandedContractRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetExpandedContractResponse>
{
  constructor(
    public msdyn_RuleSet: string,
    public msdyn_OrganizationInfo: string
  ) {
    super("msdyn_GetExpandedContract");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetExpandedContract`;

    const body: Record<string, unknown> = {
      msdyn_RuleSet: this.msdyn_RuleSet,
      msdyn_OrganizationInfo: this.msdyn_OrganizationInfo,
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

  async parseResponse(response: Response): Promise<msdyn_GetExpandedContractResponse> {
    const data = await response.json();
    return msdyn_GetExpandedContractResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetExpandedContract response message
 */
export class msdyn_GetExpandedContractResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetExpandedContractResponseData) {
    super("msdyn_GetExpandedContract");
  }

  static fromResponse(data: unknown): msdyn_GetExpandedContractResponse {
    return new msdyn_GetExpandedContractResponse(
      responseObject<msdyn_GetExpandedContractResponseData>(data)
    );
  }
}
