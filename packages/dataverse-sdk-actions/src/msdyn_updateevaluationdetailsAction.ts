import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_updateevaluationdetails action
 */
export interface msdyn_updateevaluationdetailsResponse {
  msdyn_updatestatus: boolean;
}

/**
 * msdyn_updateevaluationdetails action
 *
 * Unbound action
 */
export class msdyn_updateevaluationdetailsAction implements Executable<msdyn_updateevaluationdetailsResponse> {
  constructor(public readonly msdyn_evaluationdetails: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateevaluationdetails`;

    const body: Record<string, unknown> = {
      msdyn_evaluationdetails: this.msdyn_evaluationdetails,
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

  async parseResponse(response: Response): Promise<msdyn_updateevaluationdetailsResponse> {
    const data = await response.json();
    return data as msdyn_updateevaluationdetailsResponse;
  }
}
