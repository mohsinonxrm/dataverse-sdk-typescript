import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CascadeCrewMemberships message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CascadeCrewMembershipsRequestParameters {
  Payload: string;
}

/**
 * msdyn_CascadeCrewMemberships request message
 *
 * Web API Action: msdyn_CascadeCrewMemberships
 */
export class msdyn_CascadeCrewMembershipsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CascadeCrewMembershipsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CascadeCrewMembershipsRequestParameters>;

  constructor(parameters: msdyn_CascadeCrewMembershipsRequestParameters) {
    super("msdyn_CascadeCrewMemberships", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeCrewMemberships`;

    const body = requestBody({
      Payload: this.Parameters.Payload,
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

  async parseResponse(response: Response): Promise<msdyn_CascadeCrewMembershipsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CascadeCrewMembershipsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CascadeCrewMemberships action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CascadeCrewMembershipsResult {
  "@odata.context"?: string;
  AsyncOperationRequestId: string;
}

/**
 * msdyn_CascadeCrewMemberships response message
 *
 * `result` is the value the msdyn_CascadeCrewMemberships action returns (see {@link msdyn_CascadeCrewMembershipsResult}).
 */
export class msdyn_CascadeCrewMembershipsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CascadeCrewMembershipsResult) {
    super("msdyn_CascadeCrewMemberships");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CascadeCrewMembershipsResponse {
    return new msdyn_CascadeCrewMembershipsResponse(data as msdyn_CascadeCrewMembershipsResult);
  }
}
