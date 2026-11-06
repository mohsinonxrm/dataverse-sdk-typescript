import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetFCSWithUserContext message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCSWithUserContextRequestParameters {
  msdyn_GetFCSWithUserContextInput: string;
}

/**
 * msdyn_GetFCSWithUserContext request message
 *
 * Web API Action: msdyn_GetFCSWithUserContext
 */
export class msdyn_GetFCSWithUserContextRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCSWithUserContextResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFCSWithUserContextRequestParameters>;

  constructor(parameters: msdyn_GetFCSWithUserContextRequestParameters) {
    super("msdyn_GetFCSWithUserContext", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSWithUserContext`;

    const body = requestBody({
      msdyn_GetFCSWithUserContextInput: this.Parameters.msdyn_GetFCSWithUserContextInput,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSWithUserContextResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetFCSWithUserContextResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetFCSWithUserContext action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFCSWithUserContextResult {
  "@odata.context"?: string;
  msdyn_GetFCSWithUserContextOutput: string;
}

/**
 * msdyn_GetFCSWithUserContext response message
 *
 * `result` is the value the msdyn_GetFCSWithUserContext action returns (see {@link msdyn_GetFCSWithUserContextResult}).
 */
export class msdyn_GetFCSWithUserContextResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCSWithUserContextResult) {
    super("msdyn_GetFCSWithUserContext");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetFCSWithUserContextResponse {
    return new msdyn_GetFCSWithUserContextResponse(data as msdyn_GetFCSWithUserContextResult);
  }
}
