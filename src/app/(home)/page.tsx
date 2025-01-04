'use client'

import { usePaginatedQuery } from "convex/react";
import { HomeNavbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";

// Time Stamp: 06:00:00

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(api.documents.get, {}, { initialNumItems: 5 });

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