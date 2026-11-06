import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_JsonGetNumberResponse as msdyn_JsonGetNumberResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_JsonGetNumber message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetNumberRequestParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: number;
}

/**
 * msdyn_JsonGetNumber request message
 *
 * Web API Action: msdyn_JsonGetNumber
 */
export class msdyn_JsonGetNumberRequest
  extends OrganizationRequest
  implements Executable<msdyn_JsonGetNumberResponse>
{
  declare readonly Parameters: Readonly<msdyn_JsonGetNumberRequestParameters>;

  constructor(parameters: msdyn_JsonGetNumberRequestParameters) {
    super("msdyn_JsonGetNumber", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetNumber`;

    const body = requestBody({
      Json: this.Parameters.Json,
      PropertyPath: this.Parameters.PropertyPath,
      DefaultReturnValue: this.Parameters.DefaultReturnValue,
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

  async parseResponse(response: Response): Promise<msdyn_JsonGetNumberResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_JsonGetNumberResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_JsonGetNumber response message
 */
export class msdyn_JsonGetNumberResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetNumberResponseData) {
    super("msdyn_JsonGetNumber");
  }

  static fromResponse(data: unknown): msdyn_JsonGetNumberResponse {
    return new msdyn_JsonGetNumberResponse(responseObject<msdyn_JsonGetNumberResponseData>(data));
  }
}
