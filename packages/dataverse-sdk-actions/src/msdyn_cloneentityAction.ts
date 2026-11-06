import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_cloneentity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_cloneentityResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * msdyn_cloneentity action
 *
 * Unbound action
 */
export class msdyn_cloneentityAction implements Executable<msdyn_cloneentityResponse> {
  constructor(
    public readonly sourceEntity: EntityReference | AnyEntityPayload,
    public readonly queryReference?: EntityReference | AnyEntityPayload,
    public readonly transformAction?: string,
    public readonly transformParams?: EntityReference | AnyEntityPayload
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_cloneentityResponse> {
    const data = await response.json();
    return data as msdyn_cloneentityResponse;
  }
}
