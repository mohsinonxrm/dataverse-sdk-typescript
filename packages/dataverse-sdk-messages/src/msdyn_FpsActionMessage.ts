import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FpsActionResponse as msdyn_FpsActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FpsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FpsActionRequestParameters {
  Type: number;
  InputParameter?: string;
}

/**
 * msdyn_FpsAction request message
 *
 * Web API Action: msdyn_FpsAction
 */
export class msdyn_FpsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FpsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FpsActionRequestParameters>;

  constructor(parameters: msdyn_FpsActionRequestParameters) {
    super("msdyn_FpsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FpsAction`;

    const body = requestBody({
      Type: this.Parameters.Type,
      InputParameter: this.Parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_FpsActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FpsActionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_FpsAction response message
 */
export class msdyn_FpsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FpsActionResponseData) {
    super("msdyn_FpsAction");
  }

  static fromResponse(data: unknown): msdyn_FpsActionResponse {
    return new msdyn_FpsActionResponse(responseObject<msdyn_FpsActionResponseData>(data));
  }
}
