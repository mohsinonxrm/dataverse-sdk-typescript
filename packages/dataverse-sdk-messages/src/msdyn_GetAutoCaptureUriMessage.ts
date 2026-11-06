import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAutoCaptureUri message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutoCaptureUriRequestParameters {
  uriType: string;
}

/**
 * msdyn_GetAutoCaptureUri request message
 *
 * Web API Action: msdyn_GetAutoCaptureUri
 */
export class msdyn_GetAutoCaptureUriRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAutoCaptureUriResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAutoCaptureUriRequestParameters>;

  constructor(parameters: msdyn_GetAutoCaptureUriRequestParameters) {
    super("msdyn_GetAutoCaptureUri", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutoCaptureUri`;

    const body = requestBody({
      uriType: this.Parameters.uriType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutoCaptureUriResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAutoCaptureUriResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAutoCaptureUri action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAutoCaptureUriResult {
  "@odata.context"?: string;
  uri: string;
}

/**
 * msdyn_GetAutoCaptureUri response message
 *
 * `result` is the value the msdyn_GetAutoCaptureUri action returns (see {@link msdyn_GetAutoCaptureUriResult}).
 */
export class msdyn_GetAutoCaptureUriResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAutoCaptureUriResult) {
    super("msdyn_GetAutoCaptureUri");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAutoCaptureUriResponse {
    return new msdyn_GetAutoCaptureUriResponse(data as msdyn_GetAutoCaptureUriResult);
  }
}
