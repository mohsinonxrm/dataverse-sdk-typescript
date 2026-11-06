import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_transformentity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_transformentityResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * msdyn_transformentity action
 *
 * Unbound action
 */
export class msdyn_transformentityAction implements Executable<msdyn_transformentityResponse> {
  constructor(
    public readonly entity: EntityReference | AnyEntityPayload,
    public readonly params: EntityReference | AnyEntityPayload
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
