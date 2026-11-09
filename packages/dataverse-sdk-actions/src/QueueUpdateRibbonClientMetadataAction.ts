import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the QueueUpdateRibbonClientMetadata action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type QueueUpdateRibbonClientMetadataResponse = void;

/**
 * QueueUpdateRibbonClientMetadata action
 *
 * Unbound action
 */
export class QueueUpdateRibbonClientMetadataAction implements Executable<QueueUpdateRibbonClientMetadataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueueUpdateRibbonClientMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<QueueUpdateRibbonClientMetadataResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
