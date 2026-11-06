import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SetSharePointDocumentStatusResponse as msdyn_SetSharePointDocumentStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SetSharePointDocumentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetSharePointDocumentStatusRequestParameters {
  Enable: boolean;
  LogicalEntityNames: string;
}

/**
 * msdyn_SetSharePointDocumentStatus request message
 *
 * Web API Action: msdyn_SetSharePointDocumentStatus
 */
export class msdyn_SetSharePointDocumentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetSharePointDocumentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetSharePointDocumentStatusRequestParameters>;

  constructor(parameters: msdyn_SetSharePointDocumentStatusRequestParameters) {
    super("msdyn_SetSharePointDocumentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetSharePointDocumentStatus`;

    const body = requestBody({
      Enable: this.Parameters.Enable,
      LogicalEntityNames: this.Parameters.LogicalEntityNames,
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

  async parseResponse(response: Response): Promise<msdyn_SetSharePointDocumentStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SetSharePointDocumentStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SetSharePointDocumentStatus response message
 */
export class msdyn_SetSharePointDocumentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetSharePointDocumentStatusResponseData) {
    super("msdyn_SetSharePointDocumentStatus");
  }

  static fromResponse(data: unknown): msdyn_SetSharePointDocumentStatusResponse {
    return new msdyn_SetSharePointDocumentStatusResponse(
      responseObject<msdyn_SetSharePointDocumentStatusResponseData>(data)
    );
  }
}
