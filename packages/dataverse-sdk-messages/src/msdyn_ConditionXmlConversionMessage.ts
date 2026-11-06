import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ConditionXmlConversionResponse as msdyn_ConditionXmlConversionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ConditionXmlConversionResponse.fromResponse({});
    return msdyn_ConditionXmlConversionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ConditionXmlConversion response message
 */
export class msdyn_ConditionXmlConversionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConditionXmlConversionResponseData) {
    super("msdyn_ConditionXmlConversion");
  }

  static fromResponse(data: unknown): msdyn_ConditionXmlConversionResponse {
    return new msdyn_ConditionXmlConversionResponse(
      responseObject<msdyn_ConditionXmlConversionResponseData>(data)
    );
  }
}
