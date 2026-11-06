import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutoLinkingLeadCustomAction action
 */
export interface msdyn_AutoLinkingLeadCustomActionResponse {
  AutoLinkResponse: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdyn_AutoLinkingLeadCustomAction action
 *
 * Unbound action
 */
export class msdyn_AutoLinkingLeadCustomActionAction implements Executable<msdyn_AutoLinkingLeadCustomActionResponse> {
  constructor(public readonly autoLinkRequest?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoLinkingLeadCustomAction`;

    const body: Record<string, unknown> = {
      AutoLinkRequest: this.autoLinkRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AutoLinkingLeadCustomActionResponse> {
    const data = await response.json();
    return data as msdyn_AutoLinkingLeadCustomActionResponse;
  }
}
