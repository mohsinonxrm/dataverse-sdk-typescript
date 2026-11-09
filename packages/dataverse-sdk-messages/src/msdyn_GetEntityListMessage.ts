import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEntityList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityListRequestParameters {
  correlationId: string;
  workflowId: string;
}

/**
 * msdyn_GetEntityList request message
 *
 * Web API Action: msdyn_GetEntityList
 */
export class msdyn_GetEntityListRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityListResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEntityListRequestParameters>;

  constructor(parameters: msdyn_GetEntityListRequestParameters) {
    super("msdyn_GetEntityList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityList`;

    const body = requestBody({
      correlationId: this.Parameters.correlationId,
      workflowId: this.Parameters.workflowId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msdyn_GetEntityListResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetEntityListResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetEntityList action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetEntityListResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetEntityList response message
 *
 * `result` is the value the msdyn_GetEntityList action returns (see {@link msdyn_GetEntityListResult}).
 */
export class msdyn_GetEntityListResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEntityListResult) {
    super("msdyn_GetEntityList");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetEntityListResponse {
    return new msdyn_GetEntityListResponse(
      data === undefined ? [] : (data as { value: msdyn_GetEntityListResult }).value
    );
  }
}
