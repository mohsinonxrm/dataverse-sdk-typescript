import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_assignentitysync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_assignentitysyncRequestParameters {
  RegardingEntityId: string;
  RegardingEntityName: string;
  SegmentId: string;
}

/**
 * msdyn_assignentitysync request message
 *
 * Web API Action: msdyn_assignentitysync
 */
export class msdyn_assignentitysyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_assignentitysyncResponse>
{
  declare readonly Parameters: Readonly<msdyn_assignentitysyncRequestParameters>;

  constructor(parameters: msdyn_assignentitysyncRequestParameters) {
    super("msdyn_assignentitysync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentitysync`;

    const body = requestBody({
      RegardingEntityId: this.Parameters.RegardingEntityId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
      SegmentId: this.Parameters.SegmentId,
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

  async parseResponse(response: Response): Promise<msdyn_assignentitysyncResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_assignentitysyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_assignentitysync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_assignentitysyncResult {
  "@odata.context"?: string;
  AssignmentPassed: boolean;
}

/**
 * msdyn_assignentitysync response message
 *
 * `result` is the value the msdyn_assignentitysync action returns (see {@link msdyn_assignentitysyncResult}).
 */
export class msdyn_assignentitysyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_assignentitysyncResult) {
    super("msdyn_assignentitysync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_assignentitysyncResponse {
    return new msdyn_assignentitysyncResponse(data as msdyn_assignentitysyncResult);
  }
}
