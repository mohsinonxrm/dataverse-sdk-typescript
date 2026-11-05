import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesExternalServiceInvoke action
 */
export interface msdyn_SalesExternalServiceInvokeResponse {
  msdyn_summary_raw: string;
  msdyn_summary: string;
  msdyn_additionalDetails: string;
}

/**
 * msdyn_SalesExternalServiceInvoke action
 *
 * Unbound action
 */
export class msdyn_SalesExternalServiceInvokeAction implements Executable<msdyn_SalesExternalServiceInvokeResponse> {
  constructor(
    public readonly msdyn_entityName: string,
    public readonly msdyn_activityId: string,
    public readonly msdyn_id: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesExternalServiceInvoke`;

    const body: Record<string, unknown> = {
      msdyn_entityName: this.msdyn_entityName,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_id: this.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesExternalServiceInvokeResponse> {
    const data = await response.json();
    return data as msdyn_SalesExternalServiceInvokeResponse;
  }
}
