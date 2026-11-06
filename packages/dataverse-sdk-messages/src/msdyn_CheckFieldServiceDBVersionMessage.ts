import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckFieldServiceDBVersionResponse as msdyn_CheckFieldServiceDBVersionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckFieldServiceDBVersion message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckFieldServiceDBVersionRequestParameters {
  ExpectedDBVersion: string;
}

/**
 * msdyn_CheckFieldServiceDBVersion request message
 *
 * Web API Action: msdyn_CheckFieldServiceDBVersion
 */
export class msdyn_CheckFieldServiceDBVersionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckFieldServiceDBVersionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckFieldServiceDBVersionRequestParameters>;

  constructor(parameters: msdyn_CheckFieldServiceDBVersionRequestParameters) {
    super("msdyn_CheckFieldServiceDBVersion", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckFieldServiceDBVersion`;

    const body = requestBody({
      ExpectedDBVersion: this.Parameters.ExpectedDBVersion,
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

  async parseResponse(response: Response): Promise<msdyn_CheckFieldServiceDBVersionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckFieldServiceDBVersionResponse.fromResponse({});
    return msdyn_CheckFieldServiceDBVersionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckFieldServiceDBVersion response message
 */
export class msdyn_CheckFieldServiceDBVersionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckFieldServiceDBVersionResponseData) {
    super("msdyn_CheckFieldServiceDBVersion");
  }

  static fromResponse(data: unknown): msdyn_CheckFieldServiceDBVersionResponse {
    return new msdyn_CheckFieldServiceDBVersionResponse(
      responseObject<msdyn_CheckFieldServiceDBVersionResponseData>(data)
    );
  }
}
