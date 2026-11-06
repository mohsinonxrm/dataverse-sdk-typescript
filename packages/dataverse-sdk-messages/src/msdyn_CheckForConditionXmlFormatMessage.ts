import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForConditionXmlFormat message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForConditionXmlFormatRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForConditionXmlFormat request message
 *
 * Web API Action: msdyn_CheckForConditionXmlFormat
 */
export class msdyn_CheckForConditionXmlFormatRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForConditionXmlFormatResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForConditionXmlFormatRequestParameters>;

  constructor(parameters: msdyn_CheckForConditionXmlFormatRequestParameters = {}) {
    super("msdyn_CheckForConditionXmlFormat", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForConditionXmlFormat`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForConditionXmlFormatResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForConditionXmlFormatResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForConditionXmlFormat action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForConditionXmlFormatResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForConditionXmlFormat response message
 *
 * `result` is the value the msdyn_CheckForConditionXmlFormat action returns (see {@link msdyn_CheckForConditionXmlFormatResult}).
 */
export class msdyn_CheckForConditionXmlFormatResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForConditionXmlFormatResult) {
    super("msdyn_CheckForConditionXmlFormat");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForConditionXmlFormatResponse {
    return new msdyn_CheckForConditionXmlFormatResponse(
      data as msdyn_CheckForConditionXmlFormatResult
    );
  }
}
