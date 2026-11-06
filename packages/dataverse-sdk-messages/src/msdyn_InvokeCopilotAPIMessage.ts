import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InvokeCopilotAPIResponse as msdyn_InvokeCopilotAPIResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeCopilotAPIResponse.fromResponse({});
    return msdyn_InvokeCopilotAPIResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InvokeCopilotAPI response message
 */
export class msdyn_InvokeCopilotAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeCopilotAPIResponseData) {
    super("msdyn_InvokeCopilotAPI");
  }

  static fromResponse(data: unknown): msdyn_InvokeCopilotAPIResponse {
    return new msdyn_InvokeCopilotAPIResponse(
      responseObject<msdyn_InvokeCopilotAPIResponseData>(data)
    );
  }
}
