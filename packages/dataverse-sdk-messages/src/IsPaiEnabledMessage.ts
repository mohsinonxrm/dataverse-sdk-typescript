import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * IsPaiEnabled request message
 *
 * Web API Action: IsPaiEnabled
 */
export class IsPaiEnabledRequest
  extends OrganizationRequest
  implements Executable<IsPaiEnabledResponse>
{
  constructor() {
    super("IsPaiEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/IsPaiEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPaiEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return IsPaiEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the IsPaiEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsPaiEnabledResult {
  "@odata.context"?: string;
  arePreviewScenarioEnabled: boolean;
  isdatamodelv2enabled: boolean;
  ispaienabled: boolean;
  paigastatus: boolean;
  templates: string;
}

/**
 * IsPaiEnabled response message
 *
 * `result` is the value the IsPaiEnabled action returns (see {@link IsPaiEnabledResult}).
 */
export class IsPaiEnabledResponse extends OrganizationResponse {
  constructor(public result: IsPaiEnabledResult) {
    super("IsPaiEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): IsPaiEnabledResponse {
    return new IsPaiEnabledResponse(data as IsPaiEnabledResult);
  }
}
