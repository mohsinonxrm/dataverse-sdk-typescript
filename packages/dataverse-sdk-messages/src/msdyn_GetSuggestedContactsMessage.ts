import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSuggestedContactsResponse as msdyn_GetSuggestedContactsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSuggestedContacts message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSuggestedContactsRequestParameters {
  EntityLogicalName: string;
  RecordId: string;
}

/**
 * msdyn_GetSuggestedContacts request message
 *
 * Web API Action: msdyn_GetSuggestedContacts
 */
export class msdyn_GetSuggestedContactsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSuggestedContactsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSuggestedContactsRequestParameters>;

  constructor(parameters: msdyn_GetSuggestedContactsRequestParameters) {
    super("msdyn_GetSuggestedContacts", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSuggestedContacts`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
      RecordId: this.Parameters.RecordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetSuggestedContactsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSuggestedContactsResponse.fromResponse({});
    return msdyn_GetSuggestedContactsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSuggestedContacts response message
 */
export class msdyn_GetSuggestedContactsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSuggestedContactsResponseData) {
    super("msdyn_GetSuggestedContacts");
  }

  static fromResponse(data: unknown): msdyn_GetSuggestedContactsResponse {
    return new msdyn_GetSuggestedContactsResponse(
      responseObject<msdyn_GetSuggestedContactsResponseData>(data)
    );
  }
}
