import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SetSharePointDocumentStatusResponse as msdyn_SetSharePointDocumentStatusResponseData } from "./types/index.js";

/**
 * msdyn_SetSharePointDocumentStatus request message
 *
 * Web API Action: msdyn_SetSharePointDocumentStatus
 */
export class msdyn_SetSharePointDocumentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetSharePointDocumentStatusResponse>
{
  constructor(
    public enable: boolean,
    public logicalEntityNames: string
  ) {
    super("msdyn_SetSharePointDocumentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetSharePointDocumentStatus`;

    const body: Record<string, unknown> = {
      Enable: this.enable,
      LogicalEntityNames: this.logicalEntityNames,
    };

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
    const data = await response.json();
    return msdyn_SetSharePointDocumentStatusResponse.fromResponse(data);
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
