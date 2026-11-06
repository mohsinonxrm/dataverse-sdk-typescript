import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateCustomActionDefinitionResponse as msdyn_CreateCustomActionDefinitionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateCustomActionDefinitionResponse.fromResponse({});
    return msdyn_CreateCustomActionDefinitionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateCustomActionDefinition response message
 */
export class msdyn_CreateCustomActionDefinitionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateCustomActionDefinitionResponseData) {
    super("msdyn_CreateCustomActionDefinition");
  }

  static fromResponse(data: unknown): msdyn_CreateCustomActionDefinitionResponse {
    return new msdyn_CreateCustomActionDefinitionResponse(
      responseObject<msdyn_CreateCustomActionDefinitionResponseData>(data)
    );
  }
}
