import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getcurrentemailcontent action
 */
export interface msdyn_getcurrentemailcontentResponse {
  currentEmailContent: string;
}

/**
 * msdyn_getcurrentemailcontent action
 *
 * Unbound action
 */
export class msdyn_getcurrentemailcontentAction implements Executable<msdyn_getcurrentemailcontentResponse> {
  constructor(public readonly emailId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getcurrentemailcontent`;

    const body: Record<string, unknown> = {
      emailId: this.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_getcurrentemailcontentResponse> {
    const data = await response.json();
    return data as msdyn_getcurrentemailcontentResponse;
  }
}
