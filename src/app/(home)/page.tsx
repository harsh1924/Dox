'use client'

import { useQuery } from "convex/react";
import { HomeNavbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { api } from "../../../convex/_generated/api";

// Time Stamp: 06:00:00

export default function Home() {
  const documents = useQuery(api.documents.get);
  if (documents === undefined) {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed p-4 top-0 left-0 right-0 z-10 h-16 bg-white">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {documents?.map((document) => (
          <span key={document._id}>
            {document.title}
          </span>
        ))}
      </div>
    </div>
  );
}