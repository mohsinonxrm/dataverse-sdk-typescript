import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_StartOptimizeResponse as msdyn_StartOptimizeResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_StartOptimize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartOptimizeRequestParameters {
  msdyn_RunId: string;
}

/**
 * msdyn_StartOptimize request message
 *
 * Web API Action: msdyn_StartOptimize
 */
export class msdyn_StartOptimizeRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartOptimizeResponse>
{
  declare readonly Parameters: Readonly<msdyn_StartOptimizeRequestParameters>;

  constructor(parameters: msdyn_StartOptimizeRequestParameters) {
    super("msdyn_StartOptimize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartOptimize`;

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

  async parseResponse(response: Response): Promise<msdyn_StartOptimizeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_StartOptimizeResponse.fromResponse({});
    return msdyn_StartOptimizeResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_StartOptimize response message
 */
export class msdyn_StartOptimizeResponse extends OrganizationResponse {
  constructor(public result: msdyn_StartOptimizeResponseData) {
    super("msdyn_StartOptimize");
  }

  static fromResponse(data: unknown): msdyn_StartOptimizeResponse {
    return new msdyn_StartOptimizeResponse(responseObject<msdyn_StartOptimizeResponseData>(data));
  }
}
