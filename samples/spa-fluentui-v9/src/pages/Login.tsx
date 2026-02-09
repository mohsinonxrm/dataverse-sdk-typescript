import { useMsal } from "@azure/msal-react";
import {
  makeStyles,
  tokens,
  Button,
  Title1,
  Title3,
  Body1,
  Card,
} from "@fluentui/react-components";
import {
  BuildingRegular,
  ShieldCheckmarkRegular,
  CloudArrowUpRegular,
} from "@fluentui/react-icons";
import { loginRequest } from "../config";

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${(tokens as any).colorBrandBackground2} 0%, ${(tokens as any).colorBrandBackground} 100%)`,
    padding: "24px",
  },
  card: {
    maxWidth: "480px",
    width: "100%",
    padding: "48px",
    textAlign: "center",
  },
  icon: {
    fontSize: "64px",
    color: (tokens as any).colorBrandForeground1,
    marginBottom: "24px",
  },
  title: {
    marginBottom: "12px",
  },
  subtitle: {
    marginBottom: "32px",
    color: (tokens as any).colorNeutralForeground2,
  },
  features: {
    display: "grid",
    gap: "16px",
    marginTop: "32px",
    marginBottom: "32px",
    textAlign: "left",
  },
  feature: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  featureIcon: {
    color: (tokens as any).colorBrandForeground1,
    fontSize: "24px",
    flexShrink: 0,
  },
  featureText: {
    flex: 1,
  },
});

export default function Login() {
  const styles = useStyles();
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await (instance as any).loginRedirect(loginRequest);
    } catch (error) {
      (console as any).error("Login failed:", error);
    }
  };

  return (
    <div className={(styles as any).container}>
      <Card className={(styles as any).card}>
        <BuildingRegular className={(styles as any).icon} />

        <Title1 className={(styles as any).title}>Dataverse Account Manager</Title1>
        <Body1 className={(styles as any).subtitle}>
          Production-quality SPA built with React 18, Fluent UI v9, and
          @mohsinonxrm/dataverse-sdk-typescript
        </Body1>

        <div className={(styles as any).features}>
          <div className={(styles as any).feature}>
            <ShieldCheckmarkRegular className={(styles as any).featureIcon} />
            <div className={(styles as any).featureText}>
              <Title3 as="h3">Secure Authentication</Title3>
              <Body1>MSAL browser integration with Azure AD</Body1>
            </div>
          </div>

          <div className={(styles as any).feature}>
            <CloudArrowUpRegular className={(styles as any).featureIcon} />
            <div className={(styles as any).featureText}>
              <Title3 as="h3">Full CRUD Operations</Title3>
              <Body1>Create, read, update, and delete Dataverse accounts</Body1>
            </div>
          </div>

          <div className={(styles as any).feature}>
            <BuildingRegular className={(styles as any).featureIcon} />
            <div className={(styles as any).featureText}>
              <Title3 as="h3">Modern UX</Title3>
              <Body1>Fluent UI v9 components with responsive design</Body1>
            </div>
          </div>
        </div>

        <Button appearance="primary" size="large" onClick={handleLogin} style={{ width: "100%" }}>
          Sign in with Microsoft
        </Button>
      </Card>
    </div>
  );
}
