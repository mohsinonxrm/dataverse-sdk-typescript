import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ConditionXmlConversion action
 */
export interface msdyn_ConditionXmlConversionResponse {
  OutputString: string;
  Exception: string;
}

/**
 * Parameters of the msdyn_ConditionXmlConversion action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConditionXmlConversionActionParameters {
  InputType: string;
  OutputType: string;
  InputString: string;
  EntityName: string;
  EnableUnderNotUnderSupport?: boolean;
}

/**
 * msdyn_ConditionXmlConversion action
 *
 * Unbound action
 */
export class msdyn_ConditionXmlConversionAction implements Executable<msdyn_ConditionXmlConversionResponse> {
  constructor(public readonly parameters: msdyn_ConditionXmlConversionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConditionXmlConversion`;

    const body = requestBody({
      InputType: this.parameters.InputType,
      OutputType: this.parameters.OutputType,
      InputString: this.parameters.InputString,
      EntityName: this.parameters.EntityName,
      EnableUnderNotUnderSupport: this.parameters.EnableUnderNotUnderSupport,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ConditionXmlConversionResponse;
  }
}
