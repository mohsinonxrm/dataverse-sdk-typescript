import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetCustomActionParameters message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCustomActionParametersRequestParameters {
  workflowId: string;
  correlationId: string;
  customAction: string;
}

/**
 * msdyn_GetCustomActionParameters request message
 *
 * Web API Action: msdyn_GetCustomActionParameters
 */
export class msdyn_GetCustomActionParametersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCustomActionParametersResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCustomActionParametersRequestParameters>;

  constructor(parameters: msdyn_GetCustomActionParametersRequestParameters) {
    super("msdyn_GetCustomActionParameters", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionParameters`;

    const body = requestBody({
      workflowId: this.Parameters.workflowId,
      correlationId: this.Parameters.correlationId,
      customAction: this.Parameters.customAction,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionParametersResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetCustomActionParametersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCustomActionParameters action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCustomActionParametersResult {
  "@odata.context"?: string;
  dynamicSchema: string;
}

/**
 * msdyn_GetCustomActionParameters response message
 *
 * `result` is the value the msdyn_GetCustomActionParameters action returns (see {@link msdyn_GetCustomActionParametersResult}).
 */
export class msdyn_GetCustomActionParametersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCustomActionParametersResult) {
    super("msdyn_GetCustomActionParameters");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCustomActionParametersResponse {
    return new msdyn_GetCustomActionParametersResponse(
      data as msdyn_GetCustomActionParametersResult
    );
  }
}
