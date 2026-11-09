import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateCustomActionDefinition message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateCustomActionDefinitionRequestParameters {
  correlationId: string;
  workflowId: string;
  customAction: string;
  entityName: string;
  customActionParams: string;
}

/**
 * msdyn_CreateCustomActionDefinition request message
 *
 * Web API Action: msdyn_CreateCustomActionDefinition
 */
export class msdyn_CreateCustomActionDefinitionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateCustomActionDefinitionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateCustomActionDefinitionRequestParameters>;

  constructor(parameters: msdyn_CreateCustomActionDefinitionRequestParameters) {
    super("msdyn_CreateCustomActionDefinition", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateCustomActionDefinition`;

    const body = requestBody({
      correlationId: this.Parameters.correlationId,
      workflowId: this.Parameters.workflowId,
      customAction: this.Parameters.customAction,
      entityName: this.Parameters.entityName,
      customActionParams: this.Parameters.customActionParams,
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

  async parseResponse(response: Response): Promise<msdyn_CreateCustomActionDefinitionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateCustomActionDefinitionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateCustomActionDefinition action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateCustomActionDefinitionResult {
  "@odata.context"?: string;
  actionDetails: string;
}

/**
 * msdyn_CreateCustomActionDefinition response message
 *
 * `result` is the value the msdyn_CreateCustomActionDefinition action returns (see {@link msdyn_CreateCustomActionDefinitionResult}).
 */
export class msdyn_CreateCustomActionDefinitionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateCustomActionDefinitionResult) {
    super("msdyn_CreateCustomActionDefinition");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateCustomActionDefinitionResponse {
    return new msdyn_CreateCustomActionDefinitionResponse(
      data as msdyn_CreateCustomActionDefinitionResult
    );
  }
}
