import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_businessclosure } from "./types/index.js";

/**
 * Response from msdyn_BusinessClosureRetrieve action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_BusinessClosureRetrieveResponse extends msdyn_businessclosure {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * msdyn_BusinessClosureRetrieve action
 *
 * Unbound action
 */
export class msdyn_BusinessClosureRetrieveAction implements Executable<msdyn_BusinessClosureRetrieveResponse> {
  constructor(public readonly id: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureRetrieve`;

    const body: Record<string, unknown> = {
      Id: this.id,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureRetrieveResponse> {
    const data = await response.json();
    return data as msdyn_BusinessClosureRetrieveResponse;
  }
}
