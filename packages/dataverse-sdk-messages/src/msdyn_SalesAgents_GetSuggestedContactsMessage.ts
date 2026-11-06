import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetSuggestedContactsResponse as msdyn_SalesAgents_GetSuggestedContactsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_GetSuggestedContacts message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetSuggestedContactsRequestParameters {
  msdyn_RegardingId: string;
  msdyn_RegardingEntity: string;
}

/**
 * msdyn_SalesAgents_GetSuggestedContacts request message
 *
 * Web API Action: msdyn_SalesAgents_GetSuggestedContacts
 */
export class msdyn_SalesAgents_GetSuggestedContactsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetSuggestedContactsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetSuggestedContactsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetSuggestedContactsRequestParameters) {
    super("msdyn_SalesAgents_GetSuggestedContacts", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSuggestedContacts`;

    const body = requestBody({
      msdyn_RegardingId: this.Parameters.msdyn_RegardingId,
      msdyn_RegardingEntity: this.Parameters.msdyn_RegardingEntity,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetSuggestedContactsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_GetSuggestedContactsResponse.fromResponse({});
    return msdyn_SalesAgents_GetSuggestedContactsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_GetSuggestedContacts response message
 */
export class msdyn_SalesAgents_GetSuggestedContactsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetSuggestedContactsResponseData) {
    super("msdyn_SalesAgents_GetSuggestedContacts");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetSuggestedContactsResponse {
    return new msdyn_SalesAgents_GetSuggestedContactsResponse(
      responseObject<msdyn_SalesAgents_GetSuggestedContactsResponseData>(data)
    );
  }
}
