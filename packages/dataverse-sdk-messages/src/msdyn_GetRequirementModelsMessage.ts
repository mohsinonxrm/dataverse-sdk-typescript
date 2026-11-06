import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetRequirementModels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementModelsRequestParameters {
  Attributes: string;
}

/**
 * msdyn_GetRequirementModels request message
 *
 * Web API Action: msdyn_GetRequirementModels
 */
export class msdyn_GetRequirementModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementModelsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRequirementModelsRequestParameters>;

  constructor(parameters: msdyn_GetRequirementModelsRequestParameters) {
    super("msdyn_GetRequirementModels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementModels`;

    const body = requestBody({
      Attributes: this.Parameters.Attributes,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementModelsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetRequirementModelsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRequirementModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementModelsResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_GetRequirementModels response message
 *
 * `result` is the value the msdyn_GetRequirementModels action returns (see {@link msdyn_GetRequirementModelsResult}).
 */
export class msdyn_GetRequirementModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementModelsResult) {
    super("msdyn_GetRequirementModels");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRequirementModelsResponse {
    return new msdyn_GetRequirementModelsResponse(data as msdyn_GetRequirementModelsResult);
  }
}
