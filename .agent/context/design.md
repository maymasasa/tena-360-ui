# Design Document: Gateway Platform

## 1. Layout Description
The Gateway Platform (Black Network) is designed for "Zero-Friction" and immediate utility. The layout emphasizes search and quick actions.

### Structure
- **Global Header / Navigation Bar**:
  - Located at the top of the screen.
  - Contains:
    - **Logo/Title**: "Gateway" or Organization Branding.
    - **User Profile**: Small avatar/icon showing current user (REQ-1.0).
    - **Connectivity Status**: Indicator for "Black Network" connection status.
- **Hero / Search Area (Top Third)**:
  - **Prominent Search Bar**: Large, centrally located input field optimized for numeric entry (REQ-2.0).
  - **Placeholder**: "Enter Entity ID..."
- **Main Content Area (Middle)**:
  - **Entity Card (Post-Search)**: Displays the "Entity Snapshot" with 3-5 core fields (Model, Status, Last Updated) (REQ-3.0).
  - **Action Grid**: Dynamic grid of action buttons (e.g., "Report Fuel", "View History") relevant to the identified entity and user role (REQ-4.0).
  - **Empty State / Feed**: When no entity is selected, this area displays the user's "Personal Workspace / History" (REQ-5.0), showing recent actions or "My Fleet" status.
- **Footer (Optional)**:
  - Minimalistic, potentially containing legal/version info or a "Back to Home" button if deep in a flow.

## 2. Component Usage
> **Guideline**: Use components from the organizational **Design System defined in Steering**.

All UI components must strictly adhere to the "Steering" Design System guidelines to ensure consistency across the Black Network ecosystem.

- **Inputs**: Use the Standard Input component with numeric keypad trigger for the Entity Search.
- **Cards**: Use the `EntityCard` component for the Snapshot view. Ensure support for "Red/Green" status indicators.
- **Buttons**:
  - **Primary Actions**: Use Large/Hero buttons for the main tools in the Action Grid.
  - **Secondary Actions**: Use standard ghost or outline buttons for less critical tasks.
- **Feedback**:
  - **Toast Notifications**: For success/error messages (e.g., "Connection Lost", "Action Reported").
  - **Loaders**: Use the system standard `Spinner` or `Skeleton` loader during data fetch.
- **Icons**: Use the approved icon set for action types (Fuel, Maintenance, Logistics).

## 3. User Flow
The flow is designed to be linear and fast: **Search -> Identify -> Action**.

1.  **Entry (Login)**:
    - User authenticates via biometric/pin (REQ-1.0).
    - System loads User Profile & Role.
2.  **Home / Search**:
    - User lands on the Home screen with the Search focus.
    - User enters **Entity ID** (numeric).
3.  **Identification (Validation)**:
    - System validates format client-side.
    - System queries Local DB (REQ-2.0).
    - **If Valid**: Show **Entity Card** (Snapshot).
    - **If Not Found**: Show error/retry state.
4.  **Action Selection**:
    - User reviews Entity Status.
    - User selects a tool from the **Action Grid** (REQ-4.0).
5.  **Handoff / Execution**:
    - Gateway redirects to specific Micro-App (Deep Link) with Entity ID context.
    - User performs task in Micro-App.
6.  **Return & History**:
    - User completes task and returns to Gateway.
    - Action is logged in **Local History** (REQ-5.0).
    - "Recent Actions" list is updated.

## 4. States

### Loading State
- **Search**: Input field shows a right-aligned spinner while querying.
- **Action Grid**: Uses Skeleton loaders to reserve space while fetching available tools.

### Error State
- **Network Error**:
  - Display a "Connection Lost" banner or empty state.
  - Provide a clear "Retry" button (REQ-5.0).
- **Entity Not Found**:
  - Inline error message below the search bar: "Entity ID [12345] not found."
  - Maintain focus in search bar for quick correction.

### Empty State
- **Home Screen (Pre-Search)**:
  - Instead of a blank screen, show **"Recent History"** or **"My Fleet"** summary to provide immediate value (Phase 2 feature, but good for MVP layout structure).
- **No Actions Available**:
  - If an entity is found but has no relevant tools for the user's role:
  - Show a friendly message: "No actions available for this entity type." (Epic 3).
