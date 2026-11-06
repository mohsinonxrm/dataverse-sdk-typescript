import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SetTeamsDocumentStatusResponse as msdyn_SetTeamsDocumentStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SetTeamsDocumentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetTeamsDocumentStatusRequestParameters {
  Enable: boolean;
  LogicalEntityNames: string;
}

/**
 * msdyn_SetTeamsDocumentStatus request message
 *
 * Web API Action: msdyn_SetTeamsDocumentStatus
 */
export class msdyn_SetTeamsDocumentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetTeamsDocumentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetTeamsDocumentStatusRequestParameters>;

  constructor(parameters: msdyn_SetTeamsDocumentStatusRequestParameters) {
    super("msdyn_SetTeamsDocumentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTeamsDocumentStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_SetTeamsDocumentStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SetTeamsDocumentStatusResponse.fromResponse({});
    return msdyn_SetTeamsDocumentStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SetTeamsDocumentStatus response message
 */
export class msdyn_SetTeamsDocumentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetTeamsDocumentStatusResponseData) {
    super("msdyn_SetTeamsDocumentStatus");
  }

  static fromResponse(data: unknown): msdyn_SetTeamsDocumentStatusResponse {
    return new msdyn_SetTeamsDocumentStatusResponse(
      responseObject<msdyn_SetTeamsDocumentStatusResponseData>(data)
    );
  }
}
