import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InvokeCopilotAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeCopilotAPIRequestParameters {
  msdyn_APIName: string;
  msdyn_payload: string;
}

/**
 * msdyn_InvokeCopilotAPI request message
 *
 * Web API Action: msdyn_InvokeCopilotAPI
 */
export class msdyn_InvokeCopilotAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeCopilotAPIResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeCopilotAPIRequestParameters>;

  constructor(parameters: msdyn_InvokeCopilotAPIRequestParameters) {
    super("msdyn_InvokeCopilotAPI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeCopilotAPI`;

    const body = requestBody({
      msdyn_APIName: this.Parameters.msdyn_APIName,
      msdyn_payload: this.Parameters.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeCopilotAPIResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeCopilotAPIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeCopilotAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeCopilotAPIResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_InvokeCopilotAPI response message
 *
 * `result` is the value the msdyn_InvokeCopilotAPI action returns (see {@link msdyn_InvokeCopilotAPIResult}).
 */
export class msdyn_InvokeCopilotAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeCopilotAPIResult) {
    super("msdyn_InvokeCopilotAPI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeCopilotAPIResponse {
    return new msdyn_InvokeCopilotAPIResponse(data as msdyn_InvokeCopilotAPIResult);
  }
}
