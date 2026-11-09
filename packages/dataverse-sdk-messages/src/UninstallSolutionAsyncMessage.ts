import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UninstallSolutionAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UninstallSolutionAsyncRequestParameters {
  SolutionUniqueName: string;
}

/**
 * UninstallSolutionAsync request message
 *
 * Web API Action: UninstallSolutionAsync
 */
export class UninstallSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<UninstallSolutionAsyncResponse>
{
  declare readonly Parameters: Readonly<UninstallSolutionAsyncRequestParameters>;

  constructor(parameters: UninstallSolutionAsyncRequestParameters) {
    super("UninstallSolutionAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSolutionAsync`;

    const body = requestBody({
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<UninstallSolutionAsyncResponse> {
    // The body is the complex value, with its @odata.context
    return UninstallSolutionAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the UninstallSolutionAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface UninstallSolutionAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * UninstallSolutionAsync response message
 *
 * `result` is the value the UninstallSolutionAsync action returns (see {@link UninstallSolutionAsyncResult}).
 */
export class UninstallSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: UninstallSolutionAsyncResult) {
    super("UninstallSolutionAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): UninstallSolutionAsyncResponse {
    return new UninstallSolutionAsyncResponse(data as UninstallSolutionAsyncResult);
  }
}
