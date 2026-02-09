import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UninstallSolutionAsync request message
 *
 * Web API Action: UninstallSolutionAsync
 */
export class UninstallSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<UninstallSolutionAsyncResponse>
{
  constructor(public solutionUniqueName: string) {
    super("UninstallSolutionAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSolutionAsync`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<UninstallSolutionAsyncResponse> {
    const data = await response.json();
    return UninstallSolutionAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionUniqueName: this.solutionUniqueName,
    };
  }
}

/**
 * UninstallSolutionAsync response message
 */
export class UninstallSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: UninstallSolutionAsyncResponse) {
    super("UninstallSolutionAsync");
  }

  static fromResponse(data: unknown): UninstallSolutionAsyncResponse {
    return new UninstallSolutionAsyncResponse((data as any).value);
  }
}
