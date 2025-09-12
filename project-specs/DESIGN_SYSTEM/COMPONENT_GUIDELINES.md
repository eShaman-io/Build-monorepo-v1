# Component Guidelines
Reference tokens from DESIGN_SYSTEM/tokens.json by semantic name.

## Button
Props: variant (primary/secondary/ghost), size (sm/md/lg), disabled, loading, iconLeft, iconRight.
States: default, hover, active, focus (visible ring), disabled, loading.
A11y: role=button, keyboard focus, aria-busy on loading, discernible text.

## Input
Props: label, placeholder, helpText, errorText, required, iconLeft, type.
States: default, focus, invalid, disabled.
A11y: label-for/id pairing, aria-invalid, describedby to help/error.

## Select
Keyboard navigable, labeled, focus ring. Announce selected via aria-live polite.

## Tabs
Roving tabindex, aria-selected, role=tablist/tab/tabpanels.

## Card
Elevation via token.shadow; avoid using for interactivity alone.

## Modal/Sheet
Focus trap, return focus to trigger, Escape closes.

## Toast
Aria role=alert for errors; dismissible with close button labeled.

## Badge
Use semantic colors; ensure contrast ratio ≥ 4.5:1.

## Stepper
Announce progress; provide next/prev labels.

## Empty State
Title, description, primary action; low-contrast illustration.

## Loading & Skeleton
Do not shift layout; respect reserved dimensions.

## Tooltip
Keyboard reachable; label via aria-describedby; never replace labels.
