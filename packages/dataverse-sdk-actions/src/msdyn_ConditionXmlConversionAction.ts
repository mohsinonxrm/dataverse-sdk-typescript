import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ConditionXmlConversion action
 */
export interface msdyn_ConditionXmlConversionResponse {
  OutputString: string;
  Exception: string;
}

/**
 * msdyn_ConditionXmlConversion action
 *
 * Unbound action
 */
export class msdyn_ConditionXmlConversionAction implements Executable<msdyn_ConditionXmlConversionResponse> {
  constructor(
    public readonly inputType: string,
    public readonly outputType: string,
    public readonly inputString: string,
    public readonly entityName: string,
    public readonly enableUnderNotUnderSupport: boolean
  ) {}

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
    return data as msdyn_ConditionXmlConversionResponse;
  }
}
