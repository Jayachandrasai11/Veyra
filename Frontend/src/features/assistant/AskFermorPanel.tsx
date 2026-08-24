/**
 * VEYRA — Ask Veyra Panel
 * Source: design_system/Interaction/Conversation.md (rules 4, 18, 34)
 *         design_system/Components/Drawer.md
 *
 * Desktop: large right-side panel. Mobile: full-height drawer.
 * Reads open/context from the Ask Veyra context.
 */

import { Drawer, DrawerContent } from "@/components/ui/Drawer/Drawer";
import { AskFermorInterface } from "./AskFermorInterface";
import { useAskFermor } from "./AskFermorContext";

export function AskFermorPanel() {
  const { open, context, closeAskFermor } = useAskFermor();

  return (
    <Drawer open={open} onOpenChange={(o) => (o ? undefined : closeAskFermor())}>
        <DrawerContent
          direction="right"
          aria-label="Ask Veyra assistant"
          onEscapeKeyDown={closeAskFermor}
          onInteractOutside={closeAskFermor}
          className="w-[min(420px,100vw)] sm:w-[420px]"
        >
        <AskFermorInterface context={context} onClose={closeAskFermor} autoFocus />
      </DrawerContent>
    </Drawer>
  );
}
