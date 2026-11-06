import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CancelOptimizeResponse as msdyn_CancelOptimizeResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CancelOptimize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelOptimizeRequestParameters {
  msdyn_RunId: string;
}

/**
 * msdyn_CancelOptimize request message
 *
 * Web API Action: msdyn_CancelOptimize
 */
export class msdyn_CancelOptimizeRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelOptimizeResponse>
{
  declare readonly Parameters: Readonly<msdyn_CancelOptimizeRequestParameters>;

  constructor(parameters: msdyn_CancelOptimizeRequestParameters) {
    super("msdyn_CancelOptimize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelOptimize`;

    const body = requestBody({
      msdyn_RunId: this.Parameters.msdyn_RunId,
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

  async parseResponse(response: Response): Promise<msdyn_CancelOptimizeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CancelOptimizeResponse.fromResponse({});
    return msdyn_CancelOptimizeResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CancelOptimize response message
 */
export class msdyn_CancelOptimizeResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelOptimizeResponseData) {
    super("msdyn_CancelOptimize");
  }

  static fromResponse(data: unknown): msdyn_CancelOptimizeResponse {
    return new msdyn_CancelOptimizeResponse(responseObject<msdyn_CancelOptimizeResponseData>(data));
  }
}
