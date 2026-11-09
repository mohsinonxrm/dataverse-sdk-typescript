import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEntityListForCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityListForCustomActionRequestParameters {
  workflowId: string;
  correlationId: string;
}

/**
 * msdyn_GetEntityListForCustomAction request message
 *
 * Web API Action: msdyn_GetEntityListForCustomAction
 */
export class msdyn_GetEntityListForCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityListForCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEntityListForCustomActionRequestParameters>;

  constructor(parameters: msdyn_GetEntityListForCustomActionRequestParameters) {
    super("msdyn_GetEntityListForCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityListForCustomAction`;

    const body = requestBody({
      workflowId: this.Parameters.workflowId,
      correlationId: this.Parameters.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListForCustomActionResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_GetEntityListForCustomActionResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetEntityListForCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetEntityListForCustomAction action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetEntityListForCustomActionResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetEntityListForCustomAction response message
 *
 * `result` is the value the msdyn_GetEntityListForCustomAction action returns (see {@link msdyn_GetEntityListForCustomActionResult}).
 */
export class msdyn_GetEntityListForCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEntityListForCustomActionResult) {
    super("msdyn_GetEntityListForCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetEntityListForCustomActionResponse {
    return new msdyn_GetEntityListForCustomActionResponse(
      data === undefined ? [] : (data as { value: msdyn_GetEntityListForCustomActionResult }).value
    );
  }
}
