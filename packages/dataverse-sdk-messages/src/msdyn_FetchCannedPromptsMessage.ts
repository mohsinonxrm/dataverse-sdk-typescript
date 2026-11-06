import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_FetchCannedPrompts message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchCannedPromptsRequestParameters {
  scenarioid: string;
  scenariotype: string;
}

/**
 * msdyn_FetchCannedPrompts request message
 *
 * Web API Action: msdyn_FetchCannedPrompts
 */
export class msdyn_FetchCannedPromptsRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchCannedPromptsResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchCannedPromptsRequestParameters>;

  constructor(parameters: msdyn_FetchCannedPromptsRequestParameters) {
    super("msdyn_FetchCannedPrompts", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchCannedPrompts`;

    const body = requestBody({
      scenarioid: this.Parameters.scenarioid,
      scenariotype: this.Parameters.scenariotype,
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

  async parseResponse(response: Response): Promise<msdyn_FetchCannedPromptsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FetchCannedPromptsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FetchCannedPrompts action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchCannedPromptsResult {
  "@odata.context"?: string;
  cannedprompts: string;
  errormessage: string;
}

/**
 * msdyn_FetchCannedPrompts response message
 *
 * `result` is the value the msdyn_FetchCannedPrompts action returns (see {@link msdyn_FetchCannedPromptsResult}).
 */
export class msdyn_FetchCannedPromptsResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchCannedPromptsResult) {
    super("msdyn_FetchCannedPrompts");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FetchCannedPromptsResponse {
    return new msdyn_FetchCannedPromptsResponse(data as msdyn_FetchCannedPromptsResult);
  }
}
