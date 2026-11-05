import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_transformentity action
 */
export interface msdyn_transformentityResponse {
  value: EntityReference;
}

/**
 * msdyn_transformentity action
 *
 * Unbound action
 */
export class msdyn_transformentityAction implements Executable<msdyn_transformentityResponse> {
  constructor(
    public readonly entity: EntityReference,
    public readonly params: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_transformentity`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
      Params: this.params,
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

  async parseResponse(response: Response): Promise<msdyn_transformentityResponse> {
    const data = await response.json();
    return data as msdyn_transformentityResponse;
  }
}
