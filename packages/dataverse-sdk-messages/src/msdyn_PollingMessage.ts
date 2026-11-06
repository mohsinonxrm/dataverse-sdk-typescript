import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_Polling message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollingRequestParameters {
  liveWorkItemId: string;
  entityLogicalName: string;
}

/**
 * msdyn_Polling request message
 *
 * Web API Action: msdyn_Polling
 */
export class msdyn_PollingRequest
  extends OrganizationRequest
  implements Executable<msdyn_PollingResponse>
{
  declare readonly Parameters: Readonly<msdyn_PollingRequestParameters>;

  constructor(parameters: msdyn_PollingRequestParameters) {
    super("msdyn_Polling", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Polling`;

    const body = requestBody({
      liveWorkItemId: this.Parameters.liveWorkItemId,
      entityLogicalName: this.Parameters.entityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_PollingResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_PollingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_Polling action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PollingResult {
  "@odata.context"?: string;
  res: string;
  response: string;
}

/**
 * msdyn_Polling response message
 *
 * `result` is the value the msdyn_Polling action returns (see {@link msdyn_PollingResult}).
 */
export class msdyn_PollingResponse extends OrganizationResponse {
  constructor(public result: msdyn_PollingResult) {
    super("msdyn_Polling");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_PollingResponse {
    return new msdyn_PollingResponse(data as msdyn_PollingResult);
  }
}
