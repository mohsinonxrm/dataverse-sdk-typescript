import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public enableUnderNotUnderSupport: boolean
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ConditionXmlConversionResponse> {
    const data = await response.json();
    return msdyn_ConditionXmlConversionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputType: this.inputType,
      OutputType: this.outputType,
      InputString: this.inputString,
      EntityName: this.entityName,
      EnableUnderNotUnderSupport: this.enableUnderNotUnderSupport,
    };
  }
}

/**
 * msdyn_ConditionXmlConversion response message
 */
export class msdyn_ConditionXmlConversionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConditionXmlConversionResponse) {
    super("msdyn_ConditionXmlConversion");
  }

  static fromResponse(data: unknown): msdyn_ConditionXmlConversionResponse {
    return new msdyn_ConditionXmlConversionResponse((data as any).value);
  }
}
