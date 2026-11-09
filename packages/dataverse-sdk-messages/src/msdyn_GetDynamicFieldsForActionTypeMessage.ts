import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetDynamicFieldsForActionType message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDynamicFieldsForActionTypeRequestParameters {
  secondaryActionType: string;
  actionType: string;
  correlationId: string;
  workflowId: string;
}

/**
 * msdyn_GetDynamicFieldsForActionType request message
 *
 * Web API Action: msdyn_GetDynamicFieldsForActionType
 */
export class msdyn_GetDynamicFieldsForActionTypeRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDynamicFieldsForActionTypeResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetDynamicFieldsForActionTypeRequestParameters>;

  constructor(parameters: msdyn_GetDynamicFieldsForActionTypeRequestParameters) {
    super("msdyn_GetDynamicFieldsForActionType", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDynamicFieldsForActionType`;

    const body = requestBody({
      secondaryActionType: this.Parameters.secondaryActionType,
      actionType: this.Parameters.actionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetDynamicFieldsForActionTypeResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetDynamicFieldsForActionTypeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetDynamicFieldsForActionType action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetDynamicFieldsForActionTypeResult {
  "@odata.context"?: string;
  dynamicSchema: string;
}

/**
 * msdyn_GetDynamicFieldsForActionType response message
 *
 * `result` is the value the msdyn_GetDynamicFieldsForActionType action returns (see {@link msdyn_GetDynamicFieldsForActionTypeResult}).
 */
export class msdyn_GetDynamicFieldsForActionTypeResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDynamicFieldsForActionTypeResult) {
    super("msdyn_GetDynamicFieldsForActionType");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetDynamicFieldsForActionTypeResponse {
    return new msdyn_GetDynamicFieldsForActionTypeResponse(
      data as msdyn_GetDynamicFieldsForActionTypeResult
    );
  }
}
