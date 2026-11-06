import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ParseKBResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ParseKBResultRequestParameters {
  DoesKBExistInExternalResult: string;
  ExternalSourceKBSearchResult: string;
}

/**
 * msdyn_ParseKBResult request message
 *
 * Web API Action: msdyn_ParseKBResult
 */
export class msdyn_ParseKBResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_ParseKBResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_ParseKBResultRequestParameters>;

  constructor(parameters: msdyn_ParseKBResultRequestParameters) {
    super("msdyn_ParseKBResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ParseKBResult`;

    const body = requestBody({
      DoesKBExistInExternalResult: this.Parameters.DoesKBExistInExternalResult,
      ExternalSourceKBSearchResult: this.Parameters.ExternalSourceKBSearchResult,
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

  async parseResponse(response: Response): Promise<msdyn_ParseKBResultResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ParseKBResultResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ParseKBResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ParseKBResultResult {
  "@odata.context"?: string;
  ParseKBExternalSourceResultResponse: string;
}

/**
 * msdyn_ParseKBResult response message
 *
 * `result` is the value the msdyn_ParseKBResult action returns (see {@link msdyn_ParseKBResultResult}).
 */
export class msdyn_ParseKBResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_ParseKBResultResult) {
    super("msdyn_ParseKBResult");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ParseKBResultResponse {
    return new msdyn_ParseKBResultResponse(data as msdyn_ParseKBResultResult);
  }
}
