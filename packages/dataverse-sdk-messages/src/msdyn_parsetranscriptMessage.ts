import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_parsetranscript message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_parsetranscriptRequestParameters {
  annotationid: string;
}

/**
 * msdyn_parsetranscript request message
 *
 * Web API Action: msdyn_parsetranscript
 */
export class msdyn_parsetranscriptRequest
  extends OrganizationRequest
  implements Executable<msdyn_parsetranscriptResponse>
{
  declare readonly Parameters: Readonly<msdyn_parsetranscriptRequestParameters>;

  constructor(parameters: msdyn_parsetranscriptRequestParameters) {
    super("msdyn_parsetranscript", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_parsetranscript`;

    const body = requestBody({
      annotationid: this.Parameters.annotationid,
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

  async parseResponse(response: Response): Promise<msdyn_parsetranscriptResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_parsetranscriptResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_parsetranscript action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_parsetranscriptResult {
  "@odata.context"?: string;
  content: string;
}

/**
 * msdyn_parsetranscript response message
 *
 * `result` is the value the msdyn_parsetranscript action returns (see {@link msdyn_parsetranscriptResult}).
 */
export class msdyn_parsetranscriptResponse extends OrganizationResponse {
  constructor(public result: msdyn_parsetranscriptResult) {
    super("msdyn_parsetranscript");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_parsetranscriptResponse {
    return new msdyn_parsetranscriptResponse(data as msdyn_parsetranscriptResult);
  }
}
