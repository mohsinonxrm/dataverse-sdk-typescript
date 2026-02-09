import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { BulkRemoveActiveCustomizationsParameters } from "./types/index.js";

/**
 * BulkRemoveActiveCustomizationsAsync request message
 *
 * Web API Action: BulkRemoveActiveCustomizationsAsync
 */
export class BulkRemoveActiveCustomizationsAsyncRequest
  extends OrganizationRequest
  implements Executable<BulkRemoveActiveCustomizationsAsyncResponse>
{
  constructor(
    public bulkRemoveActiveCustomizationsParameters: BulkRemoveActiveCustomizationsParameters
  ) {
    super("BulkRemoveActiveCustomizationsAsync");
  }

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
    return BulkRemoveActiveCustomizationsAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      BulkRemoveActiveCustomizationsParameters: this.bulkRemoveActiveCustomizationsParameters,
    };
  }
}

/**
 * BulkRemoveActiveCustomizationsAsync response message
 */
export class BulkRemoveActiveCustomizationsAsyncResponse extends OrganizationResponse {
  constructor(public result: BulkRemoveActiveCustomizationsAsyncResponse) {
    super("BulkRemoveActiveCustomizationsAsync");
  }

  static fromResponse(data: unknown): BulkRemoveActiveCustomizationsAsyncResponse {
    return new BulkRemoveActiveCustomizationsAsyncResponse((data as any).value);
  }
}
