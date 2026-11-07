import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { BulkRemoveActiveCustomizationsParameters } from "./types/index.js";

/**
 * Response from the BulkRemoveActiveCustomizationsAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BulkRemoveActiveCustomizationsAsyncResponse {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * Parameters of the BulkRemoveActiveCustomizationsAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BulkRemoveActiveCustomizationsAsyncActionParameters {
  BulkRemoveActiveCustomizationsParameters?: BulkRemoveActiveCustomizationsParameters;
}

/**
 * BulkRemoveActiveCustomizationsAsync action
 *
 * Unbound action
 */
export class BulkRemoveActiveCustomizationsAsyncAction implements Executable<BulkRemoveActiveCustomizationsAsyncResponse> {
  constructor(
    public readonly parameters: BulkRemoveActiveCustomizationsAsyncActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkRemoveActiveCustomizationsAsync`;

    const body = requestBody({
      BulkRemoveActiveCustomizationsParameters:
        this.parameters.BulkRemoveActiveCustomizationsParameters,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<BulkRemoveActiveCustomizationsAsyncResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as BulkRemoveActiveCustomizationsAsyncResponse;
  }
}
