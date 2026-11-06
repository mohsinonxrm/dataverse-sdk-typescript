import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAutoCaptureUriResponse as msdyn_GetAutoCaptureUriResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAutoCaptureUri message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutoCaptureUriRequestParameters {
  uriType: string;
}

/**
 * msdyn_GetAutoCaptureUri request message
 *
 * Web API Action: msdyn_GetAutoCaptureUri
 */
export class msdyn_GetAutoCaptureUriRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAutoCaptureUriResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAutoCaptureUriRequestParameters>;

  constructor(parameters: msdyn_GetAutoCaptureUriRequestParameters) {
    super("msdyn_GetAutoCaptureUri", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutoCaptureUri`;

    const body = requestBody({
      uriType: this.Parameters.uriType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutoCaptureUriResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetAutoCaptureUriResponse.fromResponse({});
    return msdyn_GetAutoCaptureUriResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAutoCaptureUri response message
 */
export class msdyn_GetAutoCaptureUriResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAutoCaptureUriResponseData) {
    super("msdyn_GetAutoCaptureUri");
  }

  static fromResponse(data: unknown): msdyn_GetAutoCaptureUriResponse {
    return new msdyn_GetAutoCaptureUriResponse(
      responseObject<msdyn_GetAutoCaptureUriResponseData>(data)
    );
  }
}
