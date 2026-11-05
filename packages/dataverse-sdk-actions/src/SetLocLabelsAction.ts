import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { LocalizedLabel } from "./types/index.js";

/**
 * Response from SetLocLabels action
 */
export interface SetLocLabelsResponse {
  // No content returned
}

/**
 * SetLocLabels action
 *
 * Unbound action
 */
export class SetLocLabelsAction implements Executable<SetLocLabelsResponse> {
  constructor(
    public readonly entityMoniker: EntityReference,
    public readonly attributeName: string,
    public readonly labels: LocalizedLabel[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetLocLabels`;

    const body: Record<string, unknown> = {
      EntityMoniker: this.entityMoniker,
      AttributeName: this.attributeName,
      Labels: this.labels,
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

  async parseResponse(response: Response): Promise<SetLocLabelsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
