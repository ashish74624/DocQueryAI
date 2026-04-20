import type { SourceItem } from "../types";


interface Props {
    source: SourceItem;
}

export default function SourceCard({
    source,
}: Props) {
    return (
        <div className="mt-2 p-3 bg-slate-50 border rounded-lg text-sm">
            <div className="font-semibold">
                Page {source.page}
            </div>

            <div className="text-slate-600 mt-1">
                {source.snippet}
            </div>
        </div>
    );
}