import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateDraftResponseForAction action
 */
export interface msdyn_CreateDraftResponseForActionResponse {
  msdyn_actionType: number;
  msdyn_to: string[];
  msdyn_messageId: string;
  msdyn_scheduledEnd: string;
  msdyn_internetMessageId: string;
  msdyn_subject: string;
  msdyn_cc: string[];
  msdyn_description: string;
  msdyn_scheduledStart: string;
}

/**
 * msdyn_CreateDraftResponseForAction action
 *
 * Unbound action
 */
export class msdyn_CreateDraftResponseForActionAction implements Executable<msdyn_CreateDraftResponseForActionResponse> {
  constructor(public readonly msdyn_input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateDraftResponseForAction`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateDraftResponseForActionResponse> {
    const data = await response.json();
    return data as msdyn_CreateDraftResponseForActionResponse;
  }
}
