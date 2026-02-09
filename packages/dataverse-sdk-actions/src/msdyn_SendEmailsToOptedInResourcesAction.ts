import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SendEmailsToOptedInResources action
 */
export interface msdyn_SendEmailsToOptedInResourcesResponse {
  ExceptionMessage: string;
}

/**
 * msdyn_SendEmailsToOptedInResources action
 *
 * Unbound action
 */
export class msdyn_SendEmailsToOptedInResourcesAction implements Executable<msdyn_SendEmailsToOptedInResourcesResponse> {
  constructor(
    public readonly fromUserId: string,
    public readonly toResourceIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailsToOptedInResources`;

    const body: Record<string, unknown> = {
      FromUserId: this.fromUserId,
      ToResourceIds: this.toResourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_SendEmailsToOptedInResourcesResponse> {
    const data = await response.json();
    return data as msdyn_SendEmailsToOptedInResourcesResponse;
  }
}
