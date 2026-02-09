import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { BulkRemoveActiveCustomizationsParameters } from "./types/index.js";

/**
 * Response from BulkRemoveActiveCustomizationsAsync action
 */
export interface BulkRemoveActiveCustomizationsAsyncResponse {
  AsyncOperationId: string;
}

/**
 * BulkRemoveActiveCustomizationsAsync action
 *
 * Unbound action
 */
export class BulkRemoveActiveCustomizationsAsyncAction implements Executable<BulkRemoveActiveCustomizationsAsyncResponse> {
  constructor(
    public readonly bulkRemoveActiveCustomizationsParameters: BulkRemoveActiveCustomizationsParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkRemoveActiveCustomizationsAsync`;

    const body: Record<string, unknown> = {
      BulkRemoveActiveCustomizationsParameters: this.bulkRemoveActiveCustomizationsParameters,
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

  async parseResponse(response: Response): Promise<BulkRemoveActiveCustomizationsAsyncResponse> {
    const data = await response.json();
    return data as BulkRemoveActiveCustomizationsAsyncResponse;
  }
}
