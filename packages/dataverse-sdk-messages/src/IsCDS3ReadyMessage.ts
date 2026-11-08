import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * IsCDS3Ready request message
 *
 * Web API Function: IsCDS3Ready
 */
export class IsCDS3ReadyRequest
  extends OrganizationRequest
  implements Executable<IsCDS3ReadyResponse>
{
  constructor() {
    super("IsCDS3Ready");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsCDS3Ready`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsCDS3ReadyResponse> {
    // The body is the complex value, with its @odata.context
    return IsCDS3ReadyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the IsCDS3Ready function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsCDS3ReadyResult {
  "@odata.context"?: string;
  IsReady: boolean;
}

/**
 * IsCDS3Ready response message
 *
 * `result` is the value the IsCDS3Ready function returns (see {@link IsCDS3ReadyResult}).
 */
export class IsCDS3ReadyResponse extends OrganizationResponse {
  constructor(public result: IsCDS3ReadyResult) {
    super("IsCDS3Ready");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): IsCDS3ReadyResponse {
    return new IsCDS3ReadyResponse(data as IsCDS3ReadyResult);
  }
}
