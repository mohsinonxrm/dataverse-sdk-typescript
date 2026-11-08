import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * copilottextdatastatus request message
 *
 * Web API Function: copilottextdatastatus
 */
export class copilottextdatastatusRequest
  extends OrganizationRequest
  implements Executable<copilottextdatastatusResponse>
{
  constructor() {
    super("copilottextdatastatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/copilottextdatastatus`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<copilottextdatastatusResponse> {
    // The body is the complex value, with its @odata.context
    return copilottextdatastatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the copilottextdatastatus function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface copilottextdatastatusResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * copilottextdatastatus response message
 *
 * `result` is the value the copilottextdatastatus function returns (see {@link copilottextdatastatusResult}).
 */
export class copilottextdatastatusResponse extends OrganizationResponse {
  constructor(public result: copilottextdatastatusResult) {
    super("copilottextdatastatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): copilottextdatastatusResponse {
    return new copilottextdatastatusResponse(data as copilottextdatastatusResult);
  }
}
