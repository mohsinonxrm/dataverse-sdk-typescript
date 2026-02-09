import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CreateCustomActionDefinition request message
 *
 * Web API Action: msdyn_CreateCustomActionDefinition
 */
export class msdyn_CreateCustomActionDefinitionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateCustomActionDefinitionResponse>
{
  constructor(
    public workflowId: string,
    public entityName: string,
    public customAction: string,
    public customActionParams: string,
    public correlationId: string
  ) {
    super("msdyn_CreateCustomActionDefinition");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateCustomActionDefinition`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      entityName: this.entityName,
      customAction: this.customAction,
      customActionParams: this.customActionParams,
      correlationId: this.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateCustomActionDefinitionResponse> {
    const data = await response.json();
    return msdyn_CreateCustomActionDefinitionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      workflowId: this.workflowId,
      entityName: this.entityName,
      customAction: this.customAction,
      customActionParams: this.customActionParams,
      correlationId: this.correlationId,
    };
  }
}

/**
 * msdyn_CreateCustomActionDefinition response message
 */
export class msdyn_CreateCustomActionDefinitionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateCustomActionDefinitionResponse) {
    super("msdyn_CreateCustomActionDefinition");
  }

  static fromResponse(data: unknown): msdyn_CreateCustomActionDefinitionResponse {
    return new msdyn_CreateCustomActionDefinitionResponse((data as any).value);
  }
}
