import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetNextAutoNumberValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetNextAutoNumberValueRequestParameters {
  EntityName: string;
  AttributeName: string;
}

/**
 * GetNextAutoNumberValue request message
 *
 * Web API Action: GetNextAutoNumberValue
 */
export class GetNextAutoNumberValueRequest
  extends OrganizationRequest
  implements Executable<GetNextAutoNumberValueResponse>
{
  declare readonly Parameters: Readonly<GetNextAutoNumberValueRequestParameters>;

  constructor(parameters: GetNextAutoNumberValueRequestParameters) {
    super("GetNextAutoNumberValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetNextAutoNumberValue`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      AttributeName: this.Parameters.AttributeName,
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

  async parseResponse(response: Response): Promise<GetNextAutoNumberValueResponse> {
    // The body is the complex value, with its @odata.context
    return GetNextAutoNumberValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetNextAutoNumberValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetNextAutoNumberValueResult {
  "@odata.context"?: string;
  NextAutoNumberValue: number;
}

/**
 * GetNextAutoNumberValue response message
 *
 * `result` is the value the GetNextAutoNumberValue action returns (see {@link GetNextAutoNumberValueResult}).
 */
export class GetNextAutoNumberValueResponse extends OrganizationResponse {
  constructor(public result: GetNextAutoNumberValueResult) {
    super("GetNextAutoNumberValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetNextAutoNumberValueResponse {
    return new GetNextAutoNumberValueResponse(data as GetNextAutoNumberValueResult);
  }
}
