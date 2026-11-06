import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * IsPmEnabled request message
 *
 * Web API Action: IsPmEnabled
 */
export class IsPmEnabledRequest
  extends OrganizationRequest
  implements Executable<IsPmEnabledResponse>
{
  constructor() {
    super("IsPmEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/IsPmEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPmEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return IsPmEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the IsPmEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsPmEnabledResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * IsPmEnabled response message
 *
 * `result` is the value the IsPmEnabled action returns (see {@link IsPmEnabledResult}).
 */
export class IsPmEnabledResponse extends OrganizationResponse {
  constructor(public result: IsPmEnabledResult) {
    super("IsPmEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): IsPmEnabledResponse {
    return new IsPmEnabledResponse(data as IsPmEnabledResult);
  }
}
