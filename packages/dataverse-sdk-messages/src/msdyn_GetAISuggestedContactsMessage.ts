import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAISuggestedContactsResponse as msdyn_GetAISuggestedContactsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAISuggestedContacts message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAISuggestedContactsRequestParameters {
  EntityLogicalName: string;
  RecordId: string;
}

/**
 * msdyn_GetAISuggestedContacts request message
 *
 * Web API Action: msdyn_GetAISuggestedContacts
 */
export class msdyn_GetAISuggestedContactsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAISuggestedContactsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAISuggestedContactsRequestParameters>;

  constructor(parameters: msdyn_GetAISuggestedContactsRequestParameters) {
    super("msdyn_GetAISuggestedContacts", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAISuggestedContacts`;

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

  async parseResponse(response: Response): Promise<msdyn_GetAISuggestedContactsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetAISuggestedContactsResponse.fromResponse({});
    return msdyn_GetAISuggestedContactsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAISuggestedContacts response message
 */
export class msdyn_GetAISuggestedContactsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAISuggestedContactsResponseData) {
    super("msdyn_GetAISuggestedContacts");
  }

  static fromResponse(data: unknown): msdyn_GetAISuggestedContactsResponse {
    return new msdyn_GetAISuggestedContactsResponse(
      responseObject<msdyn_GetAISuggestedContactsResponseData>(data)
    );
  }
}
