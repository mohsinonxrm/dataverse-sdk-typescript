import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_fetchemailsentimentsapi action
 */
export interface msdyn_fetchemailsentimentsapiResponse {
  emailsentimentsapijson: string;
}

/**
 * msdyn_fetchemailsentimentsapi action
 *
 * Unbound action
 */
export class msdyn_fetchemailsentimentsapiAction implements Executable<msdyn_fetchemailsentimentsapiResponse> {
  constructor(
    public readonly entityid?: string,
    public readonly entitylogicalname?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchemailsentimentsapi`;

    const body: Record<string, unknown> = {
      entityid: this.entityid,
      entitylogicalname: this.entitylogicalname,
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

  async parseResponse(response: Response): Promise<msdyn_fetchemailsentimentsapiResponse> {
    const data = await response.json();
    return data as msdyn_fetchemailsentimentsapiResponse;
  }
}
