import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetPostOperationsResponse.fromResponse({});
    return msdyn_GetPostOperationsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetPostOperations response message
 */
export class msdyn_GetPostOperationsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetPostOperations");
  }

  static fromResponse(data: unknown): msdyn_GetPostOperationsResponse {
    return new msdyn_GetPostOperationsResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
