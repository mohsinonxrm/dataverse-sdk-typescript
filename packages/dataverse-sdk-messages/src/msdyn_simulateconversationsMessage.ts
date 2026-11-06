import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_simulateconversations message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_simulateconversationsRequestParameters {
  prompt: string;
}

/**
 * msdyn_simulateconversations request message
 *
 * Web API Action: msdyn_simulateconversations
 */
export class msdyn_simulateconversationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_simulateconversationsResponse>
{
  declare readonly Parameters: Readonly<msdyn_simulateconversationsRequestParameters>;

  constructor(parameters: msdyn_simulateconversationsRequestParameters) {
    super("msdyn_simulateconversations", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_simulateconversations`;

    const body = requestBody({
      prompt: this.Parameters.prompt,
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

  async parseResponse(response: Response): Promise<msdyn_simulateconversationsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_simulateconversationsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_simulateconversations action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_simulateconversationsResult {
  "@odata.context"?: string;
  simulationrunid: string;
}

/**
 * msdyn_simulateconversations response message
 *
 * `result` is the value the msdyn_simulateconversations action returns (see {@link msdyn_simulateconversationsResult}).
 */
export class msdyn_simulateconversationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_simulateconversationsResult) {
    super("msdyn_simulateconversations");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_simulateconversationsResponse {
    return new msdyn_simulateconversationsResponse(data as msdyn_simulateconversationsResult);
  }
}
