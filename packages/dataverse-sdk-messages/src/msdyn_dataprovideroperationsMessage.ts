import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_dataprovideroperations message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_dataprovideroperationsRequestParameters {
  msdyn_payload?: string;
  msdyn_recordid?: string;
  msdyn_httpmethod: string;
}

/**
 * msdyn_dataprovideroperations request message
 *
 * Web API Action: msdyn_dataprovideroperations
 */
export class msdyn_dataprovideroperationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_dataprovideroperationsResponse>
{
  declare readonly Parameters: Readonly<msdyn_dataprovideroperationsRequestParameters>;

  constructor(parameters: msdyn_dataprovideroperationsRequestParameters) {
    super("msdyn_dataprovideroperations", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_dataprovideroperations`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
      msdyn_recordid: this.Parameters.msdyn_recordid,
      msdyn_httpmethod: this.Parameters.msdyn_httpmethod,
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

  async parseResponse(response: Response): Promise<msdyn_dataprovideroperationsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_dataprovideroperationsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_dataprovideroperations action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_dataprovideroperationsResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_dataprovideroperations response message
 *
 * `result` is the value the msdyn_dataprovideroperations action returns (see {@link msdyn_dataprovideroperationsResult}).
 */
export class msdyn_dataprovideroperationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_dataprovideroperationsResult) {
    super("msdyn_dataprovideroperations");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_dataprovideroperationsResponse {
    return new msdyn_dataprovideroperationsResponse(data as msdyn_dataprovideroperationsResult);
  }
}
