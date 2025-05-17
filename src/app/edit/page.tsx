"use client";
import EditItemPage from "@/components/utils/itemedit/EditItemPage";
import { ItemProvider } from "@/context/ItemContext";
export default function EditPage() {
  return (
    <ItemProvider>
     <EditItemPage />
    </ItemProvider>
  );
}
