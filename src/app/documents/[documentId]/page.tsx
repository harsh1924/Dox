import { EditorPage } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params;

    return (
        <Room>
            <div className="bg-[#FAFBFD] min-h-screen">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden h-[112px]">
                    <Navbar />
                    <Toolbar />
                </div>
                <div className="pt-[140px] print:pt-0">
                    <EditorPage />
                </div>
            </div>
        </Room>
    );
}

export default DocumentIdPage;