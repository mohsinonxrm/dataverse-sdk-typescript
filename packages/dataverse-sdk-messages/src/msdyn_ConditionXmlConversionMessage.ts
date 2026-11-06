import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ConditionXmlConversion message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConditionXmlConversionRequestParameters {
  InputType: string;
  OutputType: string;
  InputString: string;
  EntityName: string;
  EnableUnderNotUnderSupport?: boolean;
}

/**
 * msdyn_ConditionXmlConversion request message
 *
 * Web API Action: msdyn_ConditionXmlConversion
 */
export class msdyn_ConditionXmlConversionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConditionXmlConversionResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConditionXmlConversionRequestParameters>;

  constructor(parameters: msdyn_ConditionXmlConversionRequestParameters) {
    super("msdyn_ConditionXmlConversion", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConditionXmlConversion`;

    const body = requestBody({
      InputType: this.Parameters.InputType,
      OutputType: this.Parameters.OutputType,
      InputString: this.Parameters.InputString,
      EntityName: this.Parameters.EntityName,
      EnableUnderNotUnderSupport: this.Parameters.EnableUnderNotUnderSupport,
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

  async parseResponse(response: Response): Promise<msdyn_ConditionXmlConversionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ConditionXmlConversionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ConditionXmlConversion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConditionXmlConversionResult {
  "@odata.context"?: string;
  Exception: string;
  OutputString: string;
}

/**
 * msdyn_ConditionXmlConversion response message
 *
 * `result` is the value the msdyn_ConditionXmlConversion action returns (see {@link msdyn_ConditionXmlConversionResult}).
 */
export class msdyn_ConditionXmlConversionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConditionXmlConversionResult) {
    super("msdyn_ConditionXmlConversion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ConditionXmlConversionResponse {
    return new msdyn_ConditionXmlConversionResponse(data as msdyn_ConditionXmlConversionResult);
  }
}
