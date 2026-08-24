import { AccountConnectionFlow } from "../components/AccountConnectionFlow";

export function ConnectPage() {
  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)] max-w-[600px] mx-auto">
      <AccountConnectionFlow />
    </div>
  );
}