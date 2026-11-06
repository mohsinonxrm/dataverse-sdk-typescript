import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckReqWebResourceOnSystemFormResponse as msdyn_CheckReqWebResourceOnSystemFormResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckReqWebResourceOnSystemForm message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckReqWebResourceOnSystemFormRequestParameters {
  EntityAndWebResourceList?: string;
}

/**
 * msdyn_CheckReqWebResourceOnSystemForm request message
 *
 * Web API Action: msdyn_CheckReqWebResourceOnSystemForm
 */
export class msdyn_CheckReqWebResourceOnSystemFormRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckReqWebResourceOnSystemFormResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckReqWebResourceOnSystemFormRequestParameters>;

  constructor(parameters: msdyn_CheckReqWebResourceOnSystemFormRequestParameters = {}) {
    super("msdyn_CheckReqWebResourceOnSystemForm", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqWebResourceOnSystemForm`;

    const body = requestBody({
      EntityAndWebResourceList: this.Parameters.EntityAndWebResourceList,
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

  async parseResponse(response: Response): Promise<msdyn_CheckReqWebResourceOnSystemFormResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckReqWebResourceOnSystemFormResponse.fromResponse({});
    return msdyn_CheckReqWebResourceOnSystemFormResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckReqWebResourceOnSystemForm response message
 */
export class msdyn_CheckReqWebResourceOnSystemFormResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckReqWebResourceOnSystemFormResponseData) {
    super("msdyn_CheckReqWebResourceOnSystemForm");
  }

  static fromResponse(data: unknown): msdyn_CheckReqWebResourceOnSystemFormResponse {
    return new msdyn_CheckReqWebResourceOnSystemFormResponse(
      responseObject<msdyn_CheckReqWebResourceOnSystemFormResponseData>(data)
    );
  }
}
