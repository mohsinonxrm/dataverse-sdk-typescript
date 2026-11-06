import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckIfAutoRouteToOwnerQueueEnabled message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfAutoRouteToOwnerQueueEnabled request message
 *
 * Web API Action: msdyn_CheckIfAutoRouteToOwnerQueueEnabled
 */
export class msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequestParameters>;

  constructor(parameters: msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequestParameters = {}) {
    super("msdyn_CheckIfAutoRouteToOwnerQueueEnabled", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoRouteToOwnerQueueEnabled`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfAutoRouteToOwnerQueueEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfAutoRouteToOwnerQueueEnabledResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfAutoRouteToOwnerQueueEnabled response message
 *
 * `result` is the value the msdyn_CheckIfAutoRouteToOwnerQueueEnabled action returns (see {@link msdyn_CheckIfAutoRouteToOwnerQueueEnabledResult}).
 */
export class msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfAutoRouteToOwnerQueueEnabledResult) {
    super("msdyn_CheckIfAutoRouteToOwnerQueueEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse {
    return new msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse(
      data as msdyn_CheckIfAutoRouteToOwnerQueueEnabledResult
    );
  }
}
