import type { SdkMessageProcessingStepImageRegistration } from "./SdkMessageProcessingStepImageRegistration.js";

/**
 * SdkMessageProcessingStepRegistration complex type
 */
export interface SdkMessageProcessingStepRegistration {
  MessageName?: string;
  PrimaryEntityName?: string;
  SecondaryEntityName?: string;
  Description?: string;
  Stage?: number;
  Mode?: number;
  ImpersonatingUserId?: string;
  SupportedDeployment?: number;
  FilteringAttributes?: string;
  PluginTypeFriendlyName?: string;
  PluginTypeName?: string;
  CustomConfiguration?: string;
  InvocationSource?: number;
  Images?: SdkMessageProcessingStepImageRegistration[];
}
