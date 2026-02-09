import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DCA_SendOutreachEmail action
 */
export interface msdyn_DCA_SendOutreachEmailResponse {
  ResponseJson: string;
}

/**
 * msdyn_DCA_SendOutreachEmail action
 *
 * Unbound action
 */
export class msdyn_DCA_SendOutreachEmailAction implements Executable<msdyn_DCA_SendOutreachEmailResponse> {
  constructor(
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_SalesAgentRun: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DCA_SendOutreachEmail`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
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

  async parseResponse(response: Response): Promise<msdyn_DCA_SendOutreachEmailResponse> {
    const data = await response.json();
    return data as msdyn_DCA_SendOutreachEmailResponse;
  }
}
