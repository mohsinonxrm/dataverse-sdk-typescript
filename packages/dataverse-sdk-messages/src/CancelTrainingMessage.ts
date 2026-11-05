import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CancelTraining request message
 *
 * Web API Action: CancelTraining
 */
export class CancelTrainingRequest
  extends OrganizationRequest
  implements Executable<CancelTrainingResponse>
{
  constructor(
    public msdyn_aiconfigurationId: string,
    public version: string
  ) {
    super("CancelTraining");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.CancelTraining`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<CancelTrainingResponse> {
    const data = await response.json();
    return CancelTrainingResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aiconfigurationId,
      version: this.version,
    };
  }
}

/**
 * CancelTraining response message
 */
export class CancelTrainingResponse extends OrganizationResponse {
  constructor(public result: CancelTrainingResponse) {
    super("CancelTraining");
  }

  static fromResponse(data: unknown): CancelTrainingResponse {
    return new CancelTrainingResponse((data as any).value);
  }
}
