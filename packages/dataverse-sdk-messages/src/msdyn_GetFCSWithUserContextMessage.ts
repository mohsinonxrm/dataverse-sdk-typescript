import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetFCSWithUserContextResponse as msdyn_GetFCSWithUserContextResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetFCSWithUserContext message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCSWithUserContextRequestParameters {
  msdyn_GetFCSWithUserContextInput: string;
}

/**
 * msdyn_GetFCSWithUserContext request message
 *
 * Web API Action: msdyn_GetFCSWithUserContext
 */
export class msdyn_GetFCSWithUserContextRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCSWithUserContextResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFCSWithUserContextRequestParameters>;

  constructor(parameters: msdyn_GetFCSWithUserContextRequestParameters) {
    super("msdyn_GetFCSWithUserContext", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSWithUserContext`;

    const body = requestBody({
      msdyn_GetFCSWithUserContextInput: this.Parameters.msdyn_GetFCSWithUserContextInput,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSWithUserContextResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetFCSWithUserContextResponse.fromResponse({});
    return msdyn_GetFCSWithUserContextResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetFCSWithUserContext response message
 */
export class msdyn_GetFCSWithUserContextResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCSWithUserContextResponseData) {
    super("msdyn_GetFCSWithUserContext");
  }

  static fromResponse(data: unknown): msdyn_GetFCSWithUserContextResponse {
    return new msdyn_GetFCSWithUserContextResponse(
      responseObject<msdyn_GetFCSWithUserContextResponseData>(data)
    );
  }
}
