import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetDynamicFieldsForActionType request message
 *
 * Web API Action: msdyn_GetDynamicFieldsForActionType
 */
export class msdyn_GetDynamicFieldsForActionTypeRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDynamicFieldsForActionTypeResponse>
{
  constructor(
    public correlationId: string,
    public workflowId: string,
    public secondaryActionType: string,
    public actionType: string
  ) {
    super("msdyn_GetDynamicFieldsForActionType");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDynamicFieldsForActionType`;

    const body: Record<string, unknown> = {
      correlationId: this.correlationId,
      workflowId: this.workflowId,
      secondaryActionType: this.secondaryActionType,
      actionType: this.actionType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetDynamicFieldsForActionTypeResponse> {
    const data = await response.json();
    return msdyn_GetDynamicFieldsForActionTypeResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      correlationId: this.correlationId,
      workflowId: this.workflowId,
      secondaryActionType: this.secondaryActionType,
      actionType: this.actionType,
    };
  }
}

/**
 * msdyn_GetDynamicFieldsForActionType response message
 */
export class msdyn_GetDynamicFieldsForActionTypeResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDynamicFieldsForActionTypeResponse) {
    super("msdyn_GetDynamicFieldsForActionType");
  }

  static fromResponse(data: unknown): msdyn_GetDynamicFieldsForActionTypeResponse {
    return new msdyn_GetDynamicFieldsForActionTypeResponse((data as any).value);
  }
}
