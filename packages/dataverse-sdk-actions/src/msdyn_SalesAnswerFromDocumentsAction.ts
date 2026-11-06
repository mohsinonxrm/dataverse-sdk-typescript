import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAnswerFromDocuments action
 */
export interface msdyn_SalesAnswerFromDocumentsResponse {
  msdyn_sales_copilot_output: string;
}

/**
 * msdyn_SalesAnswerFromDocuments action
 *
 * Unbound action
 */
export class msdyn_SalesAnswerFromDocumentsAction implements Executable<msdyn_SalesAnswerFromDocumentsResponse> {
  constructor(
    public readonly msdyn_queryLocale: string | undefined,
    public readonly msdyn_responseFormat: string | undefined,
    public readonly msdyn_userQuery: string,
    public readonly msdyn_additionalParameters?: string,
    public readonly msdyn_activityId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAnswerFromDocuments`;

    const body: Record<string, unknown> = {
      msdyn_queryLocale: this.msdyn_queryLocale,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_userQuery: this.msdyn_userQuery,
      msdyn_additionalParameters: this.msdyn_additionalParameters,
      msdyn_activityId: this.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAnswerFromDocumentsResponse> {
    const data = await response.json();
    return data as msdyn_SalesAnswerFromDocumentsResponse;
  }
}
