import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CanBeReferencing action
 */
export interface CanBeReferencingResponse {
  CanBeReferencing: boolean;
}

/**
 * CanBeReferencing action
 *
 * Unbound action
 */
export class CanBeReferencingAction implements Executable<CanBeReferencingResponse> {
  constructor(public readonly entityName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferencing`;

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

  async parseResponse(response: Response): Promise<CanBeReferencingResponse> {
    const data = await response.json();
    return data as CanBeReferencingResponse;
  }
}
