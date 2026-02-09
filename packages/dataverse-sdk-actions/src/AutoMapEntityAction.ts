import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AutoMapEntity action
 */
export interface AutoMapEntityResponse {
  // No content returned
}

/**
 * AutoMapEntity action
 *
 * Unbound action
 */
export class AutoMapEntityAction implements Executable<AutoMapEntityResponse> {
  constructor(public readonly entityMapId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AutoMapEntity`;

    const body: Record<string, unknown> = {
      EntityMapId: this.entityMapId,
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

  async parseResponse(response: Response): Promise<AutoMapEntityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
