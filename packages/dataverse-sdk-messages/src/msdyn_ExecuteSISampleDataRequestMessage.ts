import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExecuteSISampleDataRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSISampleDataRequestRequestParameters {
  Operation: string;
  Version?: string;
  Lcid?: string;
}

/**
 * msdyn_ExecuteSISampleDataRequest request message
 *
 * Web API Action: msdyn_ExecuteSISampleDataRequest
 */
export class msdyn_ExecuteSISampleDataRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteSISampleDataRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteSISampleDataRequestRequestParameters>;

  constructor(parameters: msdyn_ExecuteSISampleDataRequestRequestParameters) {
    super("msdyn_ExecuteSISampleDataRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSISampleDataRequest`;

    const body = requestBody({
      Operation: this.Parameters.Operation,
      Version: this.Parameters.Version,
      Lcid: this.Parameters.Lcid,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSISampleDataRequestResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteSISampleDataRequestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteSISampleDataRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteSISampleDataRequestResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_ExecuteSISampleDataRequest response message
 *
 * `result` is the value the msdyn_ExecuteSISampleDataRequest action returns (see {@link msdyn_ExecuteSISampleDataRequestResult}).
 */
export class msdyn_ExecuteSISampleDataRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSISampleDataRequestResult) {
    super("msdyn_ExecuteSISampleDataRequest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteSISampleDataRequestResponse {
    return new msdyn_ExecuteSISampleDataRequestResponse(
      data as msdyn_ExecuteSISampleDataRequestResult
    );
  }
}
