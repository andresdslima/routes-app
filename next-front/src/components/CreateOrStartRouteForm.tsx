"use client";
import { useActionState } from "react";
import { createRouteAction } from "@/actions/create-route.action";
import { startRouteAction } from "@/actions/start-route.action";
import { CreateOrStartRoute, CreateOrStartRouteProps } from "@/types/types";

export function CreateOrStartRouteForm({
  isCreate,
  children,
}: CreateOrStartRouteProps) {
  const [state, formAction] = useActionState<CreateOrStartRoute, FormData>(
    isCreate ? createRouteAction : startRouteAction,
    null
  );

  return (
    <form
      action={formAction}
      className={isCreate ? "" : "flex flex-col space-y-4"}
    >
      {state?.error && (
        <div className="p-4 border rounded text-contrast bg-error">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-4 border rounded text-contrast bg-success">
          Rota {isCreate ? "criada" : "iniciada"} com sucesso!
        </div>
      )}
      {children}
    </form>
  );
}
