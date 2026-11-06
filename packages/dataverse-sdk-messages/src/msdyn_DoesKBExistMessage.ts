import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DoesKBExistResponse as msdyn_DoesKBExistResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_DoesKBExist message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DoesKBExistRequestParameters {
  HarvestWorkItemResponse: string;
  CSCopilotRequest: string;
}

/**
 * msdyn_DoesKBExist request message
 *
 * Web API Action: msdyn_DoesKBExist
 */
export class msdyn_DoesKBExistRequest
  extends OrganizationRequest
  implements Executable<msdyn_DoesKBExistResponse>
{
  declare readonly Parameters: Readonly<msdyn_DoesKBExistRequestParameters>;

  constructor(parameters: msdyn_DoesKBExistRequestParameters) {
    super("msdyn_DoesKBExist", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DoesKBExist`;

    const body = requestBody({
      HarvestWorkItemResponse: this.Parameters.HarvestWorkItemResponse,
      CSCopilotRequest: this.Parameters.CSCopilotRequest,
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

  async parseResponse(response: Response): Promise<msdyn_DoesKBExistResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_DoesKBExistResponse.fromResponse({});
    return msdyn_DoesKBExistResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_DoesKBExist response message
 */
export class msdyn_DoesKBExistResponse extends OrganizationResponse {
  constructor(public result: msdyn_DoesKBExistResponseData) {
    super("msdyn_DoesKBExist");
  }

  static fromResponse(data: unknown): msdyn_DoesKBExistResponse {
    return new msdyn_DoesKBExistResponse(responseObject<msdyn_DoesKBExistResponseData>(data));
  }
}
