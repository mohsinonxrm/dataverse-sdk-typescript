import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CanBeReferenced action
 */
export interface CanBeReferencedResponse {
  CanBeReferenced: boolean;
}

/**
 * CanBeReferenced action
 *
 * Unbound action
 */
export class CanBeReferencedAction implements Executable<CanBeReferencedResponse> {
  constructor(public readonly entityName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferenced`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
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

  async parseResponse(response: Response): Promise<CanBeReferencedResponse> {
    const data = await response.json();
    return data as CanBeReferencedResponse;
  }
}
