import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CreateFlowCredentialApplication action
 */
export interface CreateFlowCredentialApplicationResponse {
  flowCredentialApplicationId: string;
}

/**
 * CreateFlowCredentialApplication action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
 */
export class CreateFlowCredentialApplicationAction implements Executable<CreateFlowCredentialApplicationResponse> {
  constructor(
    public readonly flowmachinegroupId: string,
    public readonly sharingtype: string,
    public readonly password: string,
    public readonly description: string,
    public readonly certificate: string,
    public readonly applicationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.CreateFlowCredentialApplication`;

    const body: Record<string, unknown> = {
      sharingtype: this.sharingtype,
      password: this.password,
      description: this.description,
      certificate: this.certificate,
      applicationId: this.applicationId,
    };

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
    const data = await response.json();
    return data as CreateFlowCredentialApplicationResponse;
  }
}
