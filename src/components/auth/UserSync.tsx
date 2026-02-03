"use client";

import { useMutation, useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function UserSync() {
    const { user } = useUser();
    const storeUser = useMutation(api.users.store);
    const { isAuthenticated } = useConvexAuth();

    useEffect(() => {
        if (isAuthenticated && user) {
            storeUser({});
        }
    }, [isAuthenticated, user, storeUser]);

    return null;
}
