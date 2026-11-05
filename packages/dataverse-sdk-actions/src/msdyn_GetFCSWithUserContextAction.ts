import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetFCSWithUserContext action
 */
export interface msdyn_GetFCSWithUserContextResponse {
  msdyn_GetFCSWithUserContextOutput: string;
}

/**
 * msdyn_GetFCSWithUserContext action
 *
 * Unbound action
 */
export class msdyn_GetFCSWithUserContextAction implements Executable<msdyn_GetFCSWithUserContextResponse> {
  constructor(public readonly msdyn_GetFCSWithUserContextInput: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSWithUserContext`;

    const body: Record<string, unknown> = {
      msdyn_GetFCSWithUserContextInput: this.msdyn_GetFCSWithUserContextInput,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSWithUserContextResponse> {
    const data = await response.json();
    return data as msdyn_GetFCSWithUserContextResponse;
  }
}
