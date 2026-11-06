import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateRequirementModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRequirementModelRequestParameters {
  Attributes: string;
  From?: string;
  To?: string;
}

/**
 * msdyn_CreateRequirementModel request message
 *
 * Web API Action: msdyn_CreateRequirementModel
 */
export class msdyn_CreateRequirementModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateRequirementModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateRequirementModelRequestParameters>;

  constructor(parameters: msdyn_CreateRequirementModelRequestParameters) {
    super("msdyn_CreateRequirementModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementModel`;

    const body = requestBody({
      Attributes: this.Parameters.Attributes,
      From: this.Parameters.From,
      To: this.Parameters.To,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementModelResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateRequirementModelResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateRequirementModel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateRequirementModelResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_CreateRequirementModel response message
 *
 * `result` is the value the msdyn_CreateRequirementModel action returns (see {@link msdyn_CreateRequirementModelResult}).
 */
export class msdyn_CreateRequirementModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateRequirementModelResult) {
    super("msdyn_CreateRequirementModel");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateRequirementModelResponse {
    return new msdyn_CreateRequirementModelResponse(data as msdyn_CreateRequirementModelResult);
  }
}
