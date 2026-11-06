import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfWorkOrderGeneratedFromABSResponse as msdyn_CheckIfWorkOrderGeneratedFromABSResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfWorkOrderGeneratedFromABS message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfWorkOrderGeneratedFromABSRequestParameters {
  TimeInterval: string;
}

/**
 * msdyn_CheckIfWorkOrderGeneratedFromABS request message
 *
 * Web API Action: msdyn_CheckIfWorkOrderGeneratedFromABS
 */
export class msdyn_CheckIfWorkOrderGeneratedFromABSRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfWorkOrderGeneratedFromABSResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfWorkOrderGeneratedFromABSRequestParameters>;

  constructor(parameters: msdyn_CheckIfWorkOrderGeneratedFromABSRequestParameters) {
    super("msdyn_CheckIfWorkOrderGeneratedFromABS", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfWorkOrderGeneratedFromABS`;

    const body = requestBody({
      TimeInterval: this.Parameters.TimeInterval,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfWorkOrderGeneratedFromABSResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfWorkOrderGeneratedFromABSResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckIfWorkOrderGeneratedFromABS response message
 */
export class msdyn_CheckIfWorkOrderGeneratedFromABSResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfWorkOrderGeneratedFromABSResponseData) {
    super("msdyn_CheckIfWorkOrderGeneratedFromABS");
  }

  static fromResponse(data: unknown): msdyn_CheckIfWorkOrderGeneratedFromABSResponse {
    return new msdyn_CheckIfWorkOrderGeneratedFromABSResponse(
      responseObject<msdyn_CheckIfWorkOrderGeneratedFromABSResponseData>(data)
    );
  }
}
