import { EditorPage } from "./editor";
import { Toolbar } from "./toolbar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params;
    
    return (
        <div className="bg-[#FAFBFD] min-h-screen">
            <Toolbar />
            <EditorPage />
        </div>
    );
}

export default DocumentIdPage;