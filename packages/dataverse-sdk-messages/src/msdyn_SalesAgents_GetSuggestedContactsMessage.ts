import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetSuggestedContactsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_GetSuggestedContacts action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetSuggestedContactsResult {
  "@odata.context"?: string;
  msdyn_Contacts: string;
}

/**
 * msdyn_SalesAgents_GetSuggestedContacts response message
 *
 * `result` is the value the msdyn_SalesAgents_GetSuggestedContacts action returns (see {@link msdyn_SalesAgents_GetSuggestedContactsResult}).
 */
export class msdyn_SalesAgents_GetSuggestedContactsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetSuggestedContactsResult) {
    super("msdyn_SalesAgents_GetSuggestedContacts");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetSuggestedContactsResponse {
    return new msdyn_SalesAgents_GetSuggestedContactsResponse(
      data as msdyn_SalesAgents_GetSuggestedContactsResult
    );
  }
}
