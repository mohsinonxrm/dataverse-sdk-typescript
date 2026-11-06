import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AcsForceSyncActionResponse as msdyn_AcsForceSyncActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AcsForceSyncAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AcsForceSyncActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_AcsForceSyncAction request message
 *
 * Web API Action: msdyn_AcsForceSyncAction
 */
export class msdyn_AcsForceSyncActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AcsForceSyncActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_AcsForceSyncActionRequestParameters>;

  constructor(parameters: msdyn_AcsForceSyncActionRequestParameters) {
    super("msdyn_AcsForceSyncAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcsForceSyncAction`;

    const body = requestBody({
      ActionRequest: this.Parameters.ActionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AcsForceSyncActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_AcsForceSyncActionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_AcsForceSyncAction response message
 */
export class msdyn_AcsForceSyncActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AcsForceSyncActionResponseData) {
    super("msdyn_AcsForceSyncAction");
  }

  static fromResponse(data: unknown): msdyn_AcsForceSyncActionResponse {
    return new msdyn_AcsForceSyncActionResponse(
      responseObject<msdyn_AcsForceSyncActionResponseData>(data)
    );
  }
}
