import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetCustomActionList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCustomActionListRequestParameters {
  correlationId: string;
  workflowId: string;
  entityName: string;
}

/**
 * msdyn_GetCustomActionList request message
 *
 * Web API Action: msdyn_GetCustomActionList
 */
export class msdyn_GetCustomActionListRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCustomActionListResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCustomActionListRequestParameters>;

  constructor(parameters: msdyn_GetCustomActionListRequestParameters) {
    super("msdyn_GetCustomActionList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionList`;

    const body = requestBody({
      correlationId: this.Parameters.correlationId,
      workflowId: this.Parameters.workflowId,
      entityName: this.Parameters.entityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionListResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msdyn_GetCustomActionListResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetCustomActionListResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCustomActionList action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetCustomActionListResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetCustomActionList response message
 *
 * `result` is the value the msdyn_GetCustomActionList action returns (see {@link msdyn_GetCustomActionListResult}).
 */
export class msdyn_GetCustomActionListResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCustomActionListResult) {
    super("msdyn_GetCustomActionList");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCustomActionListResponse {
    return new msdyn_GetCustomActionListResponse(
      data === undefined ? [] : (data as { value: msdyn_GetCustomActionListResult }).value
    );
  }
}
