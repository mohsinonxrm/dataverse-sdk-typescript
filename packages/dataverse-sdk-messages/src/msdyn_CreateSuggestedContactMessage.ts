import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateSuggestedContactResponse as msdyn_CreateSuggestedContactResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateSuggestedContact message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedContactRequestParameters {
  SuggestedContactId: string;
}

/**
 * msdyn_CreateSuggestedContact request message
 *
 * Web API Action: msdyn_CreateSuggestedContact
 */
export class msdyn_CreateSuggestedContactRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSuggestedContactResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateSuggestedContactRequestParameters>;

  constructor(parameters: msdyn_CreateSuggestedContactRequestParameters) {
    super("msdyn_CreateSuggestedContact", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedContact`;

    const body = requestBody({
      SuggestedContactId: this.Parameters.SuggestedContactId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedContactResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateSuggestedContactResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CreateSuggestedContact response message
 */
export class msdyn_CreateSuggestedContactResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateSuggestedContactResponseData) {
    super("msdyn_CreateSuggestedContact");
  }

  static fromResponse(data: unknown): msdyn_CreateSuggestedContactResponse {
    return new msdyn_CreateSuggestedContactResponse(
      responseObject<msdyn_CreateSuggestedContactResponseData>(data)
    );
  }
}
