import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_configuration } from "./types/index.js";

/**
 * Response from msdyn_CloneMultiple action
 */
export interface msdyn_CloneMultipleResponse {
  CopiedEntities: string;
}

/**
 * msdyn_CloneMultiple action
 *
 * Unbound action
 */
export class msdyn_CloneMultipleAction implements Executable<msdyn_CloneMultipleResponse> {
  constructor(
    public readonly entityIds: string,
    public readonly queryReference: msdyn_configuration,
    public readonly ufxQuery: string,
    public readonly transformAction: string,
    public readonly transformParams: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneMultiple`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      QueryReference: this.queryReference,
      UfxQuery: this.ufxQuery,
      TransformAction: this.transformAction,
      TransformParams: this.transformParams,
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

  async parseResponse(response: Response): Promise<msdyn_CloneMultipleResponse> {
    const data = await response.json();
    return data as msdyn_CloneMultipleResponse;
  }
}
