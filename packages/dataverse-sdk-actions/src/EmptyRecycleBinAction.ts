import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the EmptyRecycleBin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface EmptyRecycleBinResponse {
  "@odata.context"?: string;
  DeletedCount: number;
}

/**
 * EmptyRecycleBin action
 *
 * Unbound action
 */
export class EmptyRecycleBinAction implements Executable<EmptyRecycleBinResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/EmptyRecycleBin`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<EmptyRecycleBinResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as EmptyRecycleBinResponse;
  }
}
