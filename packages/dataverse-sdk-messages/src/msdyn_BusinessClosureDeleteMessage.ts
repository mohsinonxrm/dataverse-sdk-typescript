import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_BusinessClosureDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureDeleteRequestParameters {
  Ids: string;
}

/**
 * msdyn_BusinessClosureDelete request message
 *
 * Web API Action: msdyn_BusinessClosureDelete
 */
export class msdyn_BusinessClosureDeleteRequest
  extends OrganizationRequest
  implements Executable<msdyn_BusinessClosureDeleteResponse>
{
  declare readonly Parameters: Readonly<msdyn_BusinessClosureDeleteRequestParameters>;

  constructor(parameters: msdyn_BusinessClosureDeleteRequestParameters) {
    super("msdyn_BusinessClosureDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureDelete`;

    const body = requestBody({
      Ids: this.Parameters.Ids,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureDeleteResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_BusinessClosureDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_BusinessClosureDelete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_BusinessClosureDeleteResult {
  "@odata.context"?: string;
  RemainingIds: string;
}

/**
 * msdyn_BusinessClosureDelete response message
 *
 * `result` is the value the msdyn_BusinessClosureDelete action returns (see {@link msdyn_BusinessClosureDeleteResult}).
 */
export class msdyn_BusinessClosureDeleteResponse extends OrganizationResponse {
  constructor(public result: msdyn_BusinessClosureDeleteResult) {
    super("msdyn_BusinessClosureDelete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_BusinessClosureDeleteResponse {
    return new msdyn_BusinessClosureDeleteResponse(data as msdyn_BusinessClosureDeleteResult);
  }
}
