import type { SdkMessageProcessingStepImageRegistration } from "./SdkMessageProcessingStepImageRegistration.js";

/**
 * SdkMessageProcessingStepRegistration complex type
 */
export interface SdkMessageProcessingStepRegistration {
  CustomConfiguration?: string;
  Description?: string;
  FilteringAttributes?: string;
  Images?: SdkMessageProcessingStepImageRegistration[];
  ImpersonatingUserId?: string;
  InvocationSource?: number;
  MessageName?: string;
  Mode?: number;
  PluginTypeFriendlyName?: string;
  PluginTypeName?: string;
  PrimaryEntityName?: string;
  SecondaryEntityName?: string;
  Stage?: number;
  SupportedDeployment?: number;
}
