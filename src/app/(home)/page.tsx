'use client'

import { usePaginatedQuery } from "convex/react";
import { useSearchParam } from "@/hooks/use-search-param";
import { DocumentsTable } from "./documents-table";
import { HomeNavbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const [search] = useSearchParam();

  const { results, status, loadMore } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 });

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed p-4 top-0 left-0 right-0 z-10 h-16 bg-white">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable documents={results} loadMore={loadMore} status={status} />
      </div>
    </div>
  );
}