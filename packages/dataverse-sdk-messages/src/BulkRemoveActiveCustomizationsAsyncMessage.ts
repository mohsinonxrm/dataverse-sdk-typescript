import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { BulkRemoveActiveCustomizationsParameters } from "./types/index.js";

/**
 * Parameters of the BulkRemoveActiveCustomizationsAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BulkRemoveActiveCustomizationsAsyncRequestParameters {
  BulkRemoveActiveCustomizationsParameters?: BulkRemoveActiveCustomizationsParameters;
}

/**
 * BulkRemoveActiveCustomizationsAsync request message
 *
 * Web API Action: BulkRemoveActiveCustomizationsAsync
 */
export class BulkRemoveActiveCustomizationsAsyncRequest
  extends OrganizationRequest
  implements Executable<BulkRemoveActiveCustomizationsAsyncResponse>
{
  declare readonly Parameters: Readonly<BulkRemoveActiveCustomizationsAsyncRequestParameters>;

  constructor(parameters: BulkRemoveActiveCustomizationsAsyncRequestParameters = {}) {
    super("BulkRemoveActiveCustomizationsAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkRemoveActiveCustomizationsAsync`;

    const body = requestBody({
      BulkRemoveActiveCustomizationsParameters:
        this.Parameters.BulkRemoveActiveCustomizationsParameters,
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
    return BulkRemoveActiveCustomizationsAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the BulkRemoveActiveCustomizationsAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BulkRemoveActiveCustomizationsAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * BulkRemoveActiveCustomizationsAsync response message
 *
 * `result` is the value the BulkRemoveActiveCustomizationsAsync action returns (see {@link BulkRemoveActiveCustomizationsAsyncResult}).
 */
export class BulkRemoveActiveCustomizationsAsyncResponse extends OrganizationResponse {
  constructor(public result: BulkRemoveActiveCustomizationsAsyncResult) {
    super("BulkRemoveActiveCustomizationsAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BulkRemoveActiveCustomizationsAsyncResponse {
    return new BulkRemoveActiveCustomizationsAsyncResponse(
      data as BulkRemoveActiveCustomizationsAsyncResult
    );
  }
}
