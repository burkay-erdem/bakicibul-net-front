"use client"
import { usePathname, useRouter } from "next/navigation";



export default function ClearParamsButton() {
    const router = useRouter();
    const pathname = usePathname()

    const clearParams = () => {
        // Clear search parameters by navigating to the same path without query
        router.push(pathname, undefined);
    };

    return (
        <button onClick={clearParams} className="px-4 py-2 m-4">
            Clear Search Parameters
        </button>

    );
}
