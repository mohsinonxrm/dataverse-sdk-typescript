import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  BulkRemoveActiveCustomizationsAsyncResponse as BulkRemoveActiveCustomizationsAsyncResponseData,
  BulkRemoveActiveCustomizationsParameters,
} from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return BulkRemoveActiveCustomizationsAsyncResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * BulkRemoveActiveCustomizationsAsync response message
 */
export class BulkRemoveActiveCustomizationsAsyncResponse extends OrganizationResponse {
  constructor(public result: BulkRemoveActiveCustomizationsAsyncResponseData) {
    super("BulkRemoveActiveCustomizationsAsync");
  }

  static fromResponse(data: unknown): BulkRemoveActiveCustomizationsAsyncResponse {
    return new BulkRemoveActiveCustomizationsAsyncResponse(
      responseObject<BulkRemoveActiveCustomizationsAsyncResponseData>(data)
    );
  }
}
