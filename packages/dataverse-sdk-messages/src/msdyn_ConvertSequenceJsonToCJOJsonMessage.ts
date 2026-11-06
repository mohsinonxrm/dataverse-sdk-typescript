import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ConvertSequenceJsonToCJOJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertSequenceJsonToCJOJsonRequestParameters {
  SequenceId: string;
}

/**
 * msdyn_ConvertSequenceJsonToCJOJson request message
 *
 * Web API Action: msdyn_ConvertSequenceJsonToCJOJson
 */
export class msdyn_ConvertSequenceJsonToCJOJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertSequenceJsonToCJOJsonResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConvertSequenceJsonToCJOJsonRequestParameters>;

  constructor(parameters: msdyn_ConvertSequenceJsonToCJOJsonRequestParameters) {
    super("msdyn_ConvertSequenceJsonToCJOJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertSequenceJsonToCJOJson`;

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

  async parseResponse(response: Response): Promise<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ConvertSequenceJsonToCJOJsonResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ConvertSequenceJsonToCJOJson action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConvertSequenceJsonToCJOJsonResult {
  "@odata.context"?: string;
  Result: boolean;
}

/**
 * msdyn_ConvertSequenceJsonToCJOJson response message
 *
 * `result` is the value the msdyn_ConvertSequenceJsonToCJOJson action returns (see {@link msdyn_ConvertSequenceJsonToCJOJsonResult}).
 */
export class msdyn_ConvertSequenceJsonToCJOJsonResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertSequenceJsonToCJOJsonResult) {
    super("msdyn_ConvertSequenceJsonToCJOJson");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ConvertSequenceJsonToCJOJsonResponse {
    return new msdyn_ConvertSequenceJsonToCJOJsonResponse(
      data as msdyn_ConvertSequenceJsonToCJOJsonResult
    );
  }
}
