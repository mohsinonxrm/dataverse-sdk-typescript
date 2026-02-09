import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_cloneentity action
 */
export interface msdyn_cloneentityResponse {
  value: EntityReference;
}

/**
 * msdyn_cloneentity action
 *
 * Unbound action
 */
export class msdyn_cloneentityAction implements Executable<msdyn_cloneentityResponse> {
  constructor(
    public readonly sourceEntity: EntityReference,
    public readonly queryReference: EntityReference,
    public readonly transformAction: string,
    public readonly transformParams: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_cloneentity`;

    const body: Record<string, unknown> = {
      SourceEntity: this.sourceEntity,
      QueryReference: this.queryReference,
      TransformAction: this.transformAction,
      TransformParams: this.transformParams,
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

  async parseResponse(response: Response): Promise<msdyn_cloneentityResponse> {
    const data = await response.json();
    return data as msdyn_cloneentityResponse;
  }
}
