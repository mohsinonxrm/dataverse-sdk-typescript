import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetExpandedContractResponse as msdyn_GetExpandedContractResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetExpandedContract message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetExpandedContractRequestParameters {
  msdyn_RuleSet: string;
  msdyn_OrganizationInfo: string;
}

/**
 * msdyn_GetExpandedContract request message
 *
 * Web API Action: msdyn_GetExpandedContract
 */
export class msdyn_GetExpandedContractRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetExpandedContractResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetExpandedContractRequestParameters>;

  constructor(parameters: msdyn_GetExpandedContractRequestParameters) {
    super("msdyn_GetExpandedContract", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetExpandedContract`;

    const body = requestBody({
      msdyn_RuleSet: this.Parameters.msdyn_RuleSet,
      msdyn_OrganizationInfo: this.Parameters.msdyn_OrganizationInfo,
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

  async parseResponse(response: Response): Promise<msdyn_GetExpandedContractResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetExpandedContractResponse.fromResponse(text ? JSON.parse(text) : {});
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
