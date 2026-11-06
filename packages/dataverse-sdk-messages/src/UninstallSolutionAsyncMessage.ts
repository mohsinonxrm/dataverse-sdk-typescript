import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { UninstallSolutionAsyncResponse as UninstallSolutionAsyncResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return UninstallSolutionAsyncResponse.fromResponse({});
    return UninstallSolutionAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * UninstallSolutionAsync response message
 */
export class UninstallSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: UninstallSolutionAsyncResponseData) {
    super("UninstallSolutionAsync");
  }

  static fromResponse(data: unknown): UninstallSolutionAsyncResponse {
    return new UninstallSolutionAsyncResponse(
      responseObject<UninstallSolutionAsyncResponseData>(data)
    );
  }
}
