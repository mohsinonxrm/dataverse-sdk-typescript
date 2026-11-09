import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAISuggestedContactsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAISuggestedContacts action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAISuggestedContactsResult {
  "@odata.context"?: string;
  AISuggestionPayloads: string;
}

/**
 * msdyn_GetAISuggestedContacts response message
 *
 * `result` is the value the msdyn_GetAISuggestedContacts action returns (see {@link msdyn_GetAISuggestedContactsResult}).
 */
export class msdyn_GetAISuggestedContactsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAISuggestedContactsResult) {
    super("msdyn_GetAISuggestedContacts");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAISuggestedContactsResponse {
    return new msdyn_GetAISuggestedContactsResponse(data as msdyn_GetAISuggestedContactsResult);
  }
}
