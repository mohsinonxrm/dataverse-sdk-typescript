import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * EmptyRecycleBin request message
 *
 * Web API Action: EmptyRecycleBin
 */
export class EmptyRecycleBinRequest
  extends OrganizationRequest
  implements Executable<EmptyRecycleBinResponse>
{
  constructor() {
    super("EmptyRecycleBin");
  }

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
    return EmptyRecycleBinResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the EmptyRecycleBin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface EmptyRecycleBinResult {
  "@odata.context"?: string;
  DeletedCount: number;
}

/**
 * EmptyRecycleBin response message
 *
 * `result` is the value the EmptyRecycleBin action returns (see {@link EmptyRecycleBinResult}).
 */
export class EmptyRecycleBinResponse extends OrganizationResponse {
  constructor(public result: EmptyRecycleBinResult) {
    super("EmptyRecycleBin");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): EmptyRecycleBinResponse {
    return new EmptyRecycleBinResponse(data as EmptyRecycleBinResult);
  }
}
