import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetSuggestedContactsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSuggestedContacts action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSuggestedContactsResult {
  "@odata.context"?: string;
  IsUserLevelLocalized: boolean;
  SuggestedContacts: string;
}

/**
 * msdyn_GetSuggestedContacts response message
 *
 * `result` is the value the msdyn_GetSuggestedContacts action returns (see {@link msdyn_GetSuggestedContactsResult}).
 */
export class msdyn_GetSuggestedContactsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSuggestedContactsResult) {
    super("msdyn_GetSuggestedContacts");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSuggestedContactsResponse {
    return new msdyn_GetSuggestedContactsResponse(data as msdyn_GetSuggestedContactsResult);
  }
}
