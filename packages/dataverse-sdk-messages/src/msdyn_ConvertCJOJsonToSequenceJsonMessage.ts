import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ConvertCJOJsonToSequenceJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertCJOJsonToSequenceJsonRequestParameters {
  SequenceId: string;
}

/**
 * msdyn_ConvertCJOJsonToSequenceJson request message
 *
 * Web API Action: msdyn_ConvertCJOJsonToSequenceJson
 */
export class msdyn_ConvertCJOJsonToSequenceJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertCJOJsonToSequenceJsonResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConvertCJOJsonToSequenceJsonRequestParameters>;

  constructor(parameters: msdyn_ConvertCJOJsonToSequenceJsonRequestParameters) {
    super("msdyn_ConvertCJOJsonToSequenceJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertCJOJsonToSequenceJson`;

    const body = requestBody({
      SequenceId: this.Parameters.SequenceId,
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

  async parseResponse(response: Response): Promise<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ConvertCJOJsonToSequenceJsonResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ConvertCJOJsonToSequenceJson action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConvertCJOJsonToSequenceJsonResult {
  "@odata.context"?: string;
  Result: boolean;
}

/**
 * msdyn_ConvertCJOJsonToSequenceJson response message
 *
 * `result` is the value the msdyn_ConvertCJOJsonToSequenceJson action returns (see {@link msdyn_ConvertCJOJsonToSequenceJsonResult}).
 */
export class msdyn_ConvertCJOJsonToSequenceJsonResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertCJOJsonToSequenceJsonResult) {
    super("msdyn_ConvertCJOJsonToSequenceJson");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ConvertCJOJsonToSequenceJsonResponse {
    return new msdyn_ConvertCJOJsonToSequenceJsonResponse(
      data as msdyn_ConvertCJOJsonToSequenceJsonResult
    );
  }
}
