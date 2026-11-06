import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CreateFlowCredentialApplication action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateFlowCredentialApplicationResponse {
  "@odata.context"?: string;
  flowCredentialApplicationId: string;
}

/**
 * Parameters of the CreateFlowCredentialApplication action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateFlowCredentialApplicationActionParameters {
  description?: string;
  certificate: string;
  applicationId: string;
  password?: string;
  sharingtype?: string;
}

/**
 * CreateFlowCredentialApplication action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
 */
export class CreateFlowCredentialApplicationAction implements Executable<CreateFlowCredentialApplicationResponse> {
  constructor(
    public readonly flowmachinegroupId: string,
    public readonly parameters: CreateFlowCredentialApplicationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.CreateFlowCredentialApplication`;

    const body = requestBody({
      description: this.parameters.description,
      certificate: this.parameters.certificate,
      applicationId: this.parameters.applicationId,
      password: this.parameters.password,
      sharingtype: this.parameters.sharingtype,
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

  async parseResponse(response: Response): Promise<CreateFlowCredentialApplicationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CreateFlowCredentialApplicationResponse;
  }
}
