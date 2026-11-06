import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateDraftResponseForActionResponse as msdyn_CreateDraftResponseForActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateDraftResponseForAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateDraftResponseForActionRequestParameters {
  msdyn_input: string;
}

/**
 * msdyn_CreateDraftResponseForAction request message
 *
 * Web API Action: msdyn_CreateDraftResponseForAction
 */
export class msdyn_CreateDraftResponseForActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateDraftResponseForActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateDraftResponseForActionRequestParameters>;

  constructor(parameters: msdyn_CreateDraftResponseForActionRequestParameters) {
    super("msdyn_CreateDraftResponseForAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateDraftResponseForAction`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateDraftResponseForActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateDraftResponseForActionResponse.fromResponse({});
    return msdyn_CreateDraftResponseForActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateDraftResponseForAction response message
 */
export class msdyn_CreateDraftResponseForActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateDraftResponseForActionResponseData) {
    super("msdyn_CreateDraftResponseForAction");
  }

  static fromResponse(data: unknown): msdyn_CreateDraftResponseForActionResponse {
    return new msdyn_CreateDraftResponseForActionResponse(
      responseObject<msdyn_CreateDraftResponseForActionResponseData>(data)
    );
  }
}
