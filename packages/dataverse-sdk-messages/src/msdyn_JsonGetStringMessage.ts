import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_JsonGetStringResponse as msdyn_JsonGetStringResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_JsonGetString message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetStringRequestParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: string;
}

/**
 * msdyn_JsonGetString request message
 *
 * Web API Action: msdyn_JsonGetString
 */
export class msdyn_JsonGetStringRequest
  extends OrganizationRequest
  implements Executable<msdyn_JsonGetStringResponse>
{
  declare readonly Parameters: Readonly<msdyn_JsonGetStringRequestParameters>;

  constructor(parameters: msdyn_JsonGetStringRequestParameters) {
    super("msdyn_JsonGetString", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetString`;

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

  async parseResponse(response: Response): Promise<msdyn_JsonGetStringResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_JsonGetStringResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_JsonGetString response message
 */
export class msdyn_JsonGetStringResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetStringResponseData) {
    super("msdyn_JsonGetString");
  }

  static fromResponse(data: unknown): msdyn_JsonGetStringResponse {
    return new msdyn_JsonGetStringResponse(responseObject<msdyn_JsonGetStringResponseData>(data));
  }
}
