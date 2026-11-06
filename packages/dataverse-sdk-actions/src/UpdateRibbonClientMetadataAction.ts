import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the UpdateRibbonClientMetadata action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateRibbonClientMetadataResponse = void;

/**
 * UpdateRibbonClientMetadata action
 *
 * Unbound action
 */
export class UpdateRibbonClientMetadataAction implements Executable<UpdateRibbonClientMetadataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateRibbonClientMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<UpdateRibbonClientMetadataResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
