import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_simulateconversationsResponse as msdyn_simulateconversationsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_simulateconversationsResponse.fromResponse({});
    return msdyn_simulateconversationsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_simulateconversations response message
 */
export class msdyn_simulateconversationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_simulateconversationsResponseData) {
    super("msdyn_simulateconversations");
  }

  static fromResponse(data: unknown): msdyn_simulateconversationsResponse {
    return new msdyn_simulateconversationsResponse(
      responseObject<msdyn_simulateconversationsResponseData>(data)
    );
  }
}
