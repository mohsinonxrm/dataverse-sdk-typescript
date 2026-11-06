import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetFCBValueResponse as msdyn_GetFCBValueResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetFCBValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCBValueRequestParameters {
  FCBName: string;
}

/**
 * msdyn_GetFCBValue request message
 *
 * Web API Action: msdyn_GetFCBValue
 */
export class msdyn_GetFCBValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCBValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFCBValueRequestParameters>;

  constructor(parameters: msdyn_GetFCBValueRequestParameters) {
    super("msdyn_GetFCBValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCBValue`;

    const body = requestBody({
      FCBName: this.Parameters.FCBName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCBValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetFCBValueResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetFCBValue response message
 */
export class msdyn_GetFCBValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCBValueResponseData) {
    super("msdyn_GetFCBValue");
  }

  static fromResponse(data: unknown): msdyn_GetFCBValueResponse {
    return new msdyn_GetFCBValueResponse(responseObject<msdyn_GetFCBValueResponseData>(data));
  }
}
