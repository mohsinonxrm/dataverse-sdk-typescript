import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetLeadPreferredOutreachCta action
 */
export interface msdyn_GetLeadPreferredOutreachCtaResponse {
  msdyn_leadpreferredoutreachcta: number;
  msdyn_attributesforcta: string;
}

/**
 * msdyn_GetLeadPreferredOutreachCta action
 *
 * Unbound action
 */
export class msdyn_GetLeadPreferredOutreachCtaAction implements Executable<msdyn_GetLeadPreferredOutreachCtaResponse> {
  constructor(public readonly msdyn_leadid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadPreferredOutreachCta`;

    const body: Record<string, unknown> = {
      msdyn_leadid: this.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadPreferredOutreachCtaResponse> {
    const data = await response.json();
    return data as msdyn_GetLeadPreferredOutreachCtaResponse;
  }
}
