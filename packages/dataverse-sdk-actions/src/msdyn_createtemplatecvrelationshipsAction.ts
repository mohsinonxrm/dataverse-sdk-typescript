import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_createtemplatecvrelationships action
 */
export interface msdyn_createtemplatecvrelationshipsResponse {
  status: boolean;
}

/**
 * msdyn_createtemplatecvrelationships action
 *
 * Unbound action
 */
export class msdyn_createtemplatecvrelationshipsAction implements Executable<msdyn_createtemplatecvrelationshipsResponse> {
  constructor(public readonly msdyn_templaterulesetid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_createtemplatecvrelationships`;

    const body: Record<string, unknown> = {
      msdyn_templaterulesetid: this.msdyn_templaterulesetid,
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

  async parseResponse(response: Response): Promise<msdyn_createtemplatecvrelationshipsResponse> {
    const data = await response.json();
    return data as msdyn_createtemplatecvrelationshipsResponse;
  }
}
