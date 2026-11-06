import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CreateSuggestedContactResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateSuggestedContact action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateSuggestedContactResult {
  "@odata.context"?: string;
  failedRecordCount: string;
  id: string;
}

/**
 * msdyn_CreateSuggestedContact response message
 *
 * `result` is the value the msdyn_CreateSuggestedContact action returns (see {@link msdyn_CreateSuggestedContactResult}).
 */
export class msdyn_CreateSuggestedContactResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateSuggestedContactResult) {
    super("msdyn_CreateSuggestedContact");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateSuggestedContactResponse {
    return new msdyn_CreateSuggestedContactResponse(data as msdyn_CreateSuggestedContactResult);
  }
}
