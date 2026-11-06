import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FetchEventingScenarios request message
 *
 * Web API Action: msdyn_FetchEventingScenarios
 */
export class msdyn_FetchEventingScenariosRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchEventingScenariosResponse>
{
  constructor() {
    super("msdyn_FetchEventingScenarios");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEventingScenarios`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FetchEventingScenariosResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FetchEventingScenariosResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FetchEventingScenarios action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchEventingScenariosResult {
  "@odata.context"?: string;
  errormessage: string;
  scenarios: string;
}

/**
 * msdyn_FetchEventingScenarios response message
 *
 * `result` is the value the msdyn_FetchEventingScenarios action returns (see {@link msdyn_FetchEventingScenariosResult}).
 */
export class msdyn_FetchEventingScenariosResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchEventingScenariosResult) {
    super("msdyn_FetchEventingScenarios");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FetchEventingScenariosResponse {
    return new msdyn_FetchEventingScenariosResponse(data as msdyn_FetchEventingScenariosResult);
  }
}
