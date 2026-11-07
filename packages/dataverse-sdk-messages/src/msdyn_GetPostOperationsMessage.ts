import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetPostOperations message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPostOperationsRequestParameters {
  workflowId: string;
  correlationId: string;
}

/**
 * msdyn_GetPostOperations request message
 *
 * Web API Action: msdyn_GetPostOperations
 */
export class msdyn_GetPostOperationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPostOperationsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetPostOperationsRequestParameters>;

  constructor(parameters: msdyn_GetPostOperationsRequestParameters) {
    super("msdyn_GetPostOperations", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPostOperations`;

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

  async parseResponse(response: Response): Promise<msdyn_GetPostOperationsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msdyn_GetPostOperationsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetPostOperationsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetPostOperations action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetPostOperationsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetPostOperations response message
 *
 * `result` is the value the msdyn_GetPostOperations action returns (see {@link msdyn_GetPostOperationsResult}).
 */
export class msdyn_GetPostOperationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPostOperationsResult) {
    super("msdyn_GetPostOperations");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetPostOperationsResponse {
    return new msdyn_GetPostOperationsResponse(
      data === undefined ? [] : (data as { value: msdyn_GetPostOperationsResult }).value
    );
  }
}
