import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetExpandedContractResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetExpandedContract action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetExpandedContractResult {
  "@odata.context"?: string;
  msdyn_ExpandedContract: string;
}

/**
 * msdyn_GetExpandedContract response message
 *
 * `result` is the value the msdyn_GetExpandedContract action returns (see {@link msdyn_GetExpandedContractResult}).
 */
export class msdyn_GetExpandedContractResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetExpandedContractResult) {
    super("msdyn_GetExpandedContract");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetExpandedContractResponse {
    return new msdyn_GetExpandedContractResponse(data as msdyn_GetExpandedContractResult);
  }
}
