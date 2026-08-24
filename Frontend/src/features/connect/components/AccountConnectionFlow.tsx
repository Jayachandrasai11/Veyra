import { useState } from "react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { ChevronLeft } from "lucide-react";
import { AccountTypeCard } from "./AccountTypeCard";
import { InstitutionPicker } from "./InstitutionPicker";
import { AuthenticationForm } from "./AuthenticationForm";
import { ConnectionProgress } from "./ConnectionProgress";
import { accountTypes, mockInstitutions, authText } from "../constants";
import type { ConnectionStatus, ConnectionResult } from "../types";

interface AccountConnectionFlowProps {
  className?: string;
  onSuccess?: (result: ConnectionResult) => void;
}

export function AccountConnectionFlow({ className, onSuccess }: AccountConnectionFlowProps) {
  const [step, setStep] = useState<"account-type" | "institution" | "auth" | "status">("account-type");
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [errorType, setErrorType] = useState<"permission-denied" | "network-error" | "auth-failed" | undefined>(undefined);
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | undefined>(undefined);

  const handleAccountTypeSelect = (typeId: string) => {
    setSelectedAccountType(typeId);
    setStep("institution");
  };

  const handleBackToAccountType = () => {
    setStep("account-type");
    setSelectedAccountType(null);
    setSelectedInstitution(null);
  };

  const handleBackToInstitution = () => {
    setStep("institution");
    setSelectedInstitution(null);
  };

  const handleInstitutionSelect = (institutionId: string) => {
    setSelectedInstitution(institutionId);
    setStep("auth");
  };

  const handleAuthSubmit = (_data: { username: string; password: string }) => {
    setStep("status");
    setStatus("connecting");

    setTimeout(() => {
      setStatus("authenticating");

      setTimeout(() => {
        setStatus("fetching");

        setTimeout(() => {
          setStatus("syncing");

          setTimeout(() => {
            // Simulate distinct failure modes so the UI can render the
            // correct recoverable state (Permission Denied vs network/auth).
            const roll = Math.random();
            const simulatedError: "permission-denied" | "network-error" | "auth-failed" | undefined =
              roll < 0.12 ? "permission-denied" : roll < 0.2 ? "network-error" : undefined;

            if (simulatedError) {
              setErrorType(simulatedError);
              setStatus("error");
              setConnectionError(
                simulatedError === "permission-denied"
                  ? "Your bank declined the connection request."
                  : simulatedError === "network-error"
                    ? "We couldn't reach your bank."
                    : "We couldn't authenticate your credentials."
              );
            } else {
              setErrorType(undefined);
              setStatus("success");
              const institution = mockInstitutions.find(i => i.id === selectedInstitution);
              onSuccess?.({
                id: `conn-${Date.now()}`,
                institutionName: institution?.name || "Unknown",
                accountType: selectedAccountType as any,
                status: "success",
                errorType: undefined,
                errorMessage: undefined,
                syncedAt: new Date().toISOString()
              });
            }
          }, 600);
        }, 500);
      }, 400);
    }, 300);
  };

  const handleReconnect = () => {
    // Reconnecting is a distinct, visible state before the flow restarts.
    setErrorType(undefined);
    setConnectionError(undefined);
    setStatus("reconnecting");

    setTimeout(() => {
      setStep("account-type");
      setSelectedAccountType(null);
      setSelectedInstitution(null);
      setStatus("idle");
    }, 800);
  };

  const handleComplete = () => {
    // Close or navigate away
    window.history.back();
  };

  const selectedType = accountTypes.find(t => t.id === selectedAccountType);
  const authTextConfig = selectedType ? authText[selectedType.id] : undefined;

  const showBackButton = step !== "account-type";

  return (
    <div className={cn("w-full max-w-[600px] mx-auto", className)}>
      {showBackButton && (
        <div className="mb-[var(--spacing-lg)]">
          <Button
            variant="ghost"
            size="sm"
            onClick={step === "institution" ? handleBackToAccountType : handleBackToInstitution}
          >
            <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
            Back
          </Button>
        </div>
      )}

      <Card surface="brand">
        <CardContent className="p-[var(--spacing-xl)]">
          {step === "account-type" && (
            <div className="space-y-[var(--spacing-lg)]">
              <div>
                <h2 className="text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)] text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
                  Connect your financial accounts
                </h2>
                <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
                  Choose the type of account you'd like to connect to get started.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-[var(--spacing-sm)]">
                {accountTypes.map((type) => (
                  <AccountTypeCard
                    key={type.id}
                    type={type.id}
                    name={type.name}
                    icon={type.icon}
                    description={type.description}
                    selected={selectedAccountType === type.id}
                    onClick={() => handleAccountTypeSelect(type.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "institution" && selectedType && (
            <div className="space-y-[var(--spacing-md)]">
              <div>
                <h2 className="text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)] text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
                  Choose {selectedType.name}
                </h2>
                <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
                  Select your financial institution from the list below.
                </p>
              </div>
              <InstitutionPicker
                institutions={mockInstitutions.filter(i => i.type === selectedType.id)}
                selectedId={selectedInstitution || undefined}
                onSelect={handleInstitutionSelect}
              />
            </div>
          )}

          {step === "auth" && selectedType && authTextConfig && (
            <AuthenticationForm
              step={authTextConfig}
              onSubmit={handleAuthSubmit}
              onCancel={handleBackToInstitution}
            />
          )}

          {step === "status" && (
            <ConnectionProgress
              status={status}
              error={connectionError}
              errorType={errorType}
              onReconnect={handleReconnect}
              onComplete={handleComplete}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}