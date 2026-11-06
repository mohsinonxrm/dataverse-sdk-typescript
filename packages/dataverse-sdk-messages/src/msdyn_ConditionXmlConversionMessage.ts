import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ConditionXmlConversionResponse as msdyn_ConditionXmlConversionResponseData } from "./types/index.js";

/**
 * msdyn_ConditionXmlConversion request message
 *
 * Web API Action: msdyn_ConditionXmlConversion
 */
export class msdyn_ConditionXmlConversionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConditionXmlConversionResponse>
{
  constructor(
    public inputType: string,
    public outputType: string,
    public inputString: string,
    public entityName: string,
    public enableUnderNotUnderSupport?: boolean
  ) {
    super("msdyn_ConditionXmlConversion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConditionXmlConversion`;

    const body: Record<string, unknown> = {
      InputType: this.inputType,
      OutputType: this.outputType,
      InputString: this.inputString,
      EntityName: this.entityName,
      EnableUnderNotUnderSupport: this.enableUnderNotUnderSupport,
    };

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
    const data = await response.json();
    return msdyn_ConditionXmlConversionResponse.fromResponse(data);
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
