import { FiCheck } from "react-icons/fi";
import { STAGE_ORDER } from "../../features/applications/applicationsSlice";

const STAGE_LABELS = {
  Citizen: "Citizen",
  "Survey Officer": "Survey Officer",
  "Counter Employee": "Counter Employee",
  "Approval Authority": "Approval Authority",
  Approved: "Approved",
};

function stageStatus(application, stage) {
  if (application.currentStage === "Rejected") {
    const idx = STAGE_ORDER.indexOf(stage);
    const rejectedAt = application.history[application.history.length - 1]?.stage;
    const rejectedIdx = STAGE_ORDER.indexOf(rejectedAt);
    if (idx < rejectedIdx) return "completed";
    if (idx === rejectedIdx) return "rejected";
    return "pending";
  }
  const currentIdx = STAGE_ORDER.indexOf(application.currentStage);
  const idx = STAGE_ORDER.indexOf(stage);
  if (idx < currentIdx) return "completed";
  if (idx === currentIdx) return "current";
  return "pending";
}

function historyFor(application, stage) {
  return [...application.history].reverse().find((h) => h.stage === stage);
}

export default function ApprovalHistory({ application }) {
  return (
    <div className="space-y-1">
      {STAGE_ORDER.map((stage, i) => {
        const status = stageStatus(application, stage);
        const entry = historyFor(application, stage);
        const isLast = i === STAGE_ORDER.length - 1;

        return (
          <div key={stage} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  status === "completed"
                    ? "bg-success-500 text-white"
                    : status === "current"
                    ? "bg-brand-500 text-white ring-4 ring-brand-100"
                    : status === "rejected"
                    ? "bg-danger-500 text-white"
                    : "bg-ink-100 text-ink-400"
                }`}
              >
                {status === "completed" || status === "rejected" ? <FiCheck size={15} /> : i + 1}
              </div>
              {!isLast && (
                <div
                  className={`w-[2px] flex-1 ${status === "completed" ? "bg-success-500" : "bg-ink-100"}`}
                  style={{ minHeight: 32 }}
                />
              )}
            </div>
            <div className="pb-6">
              <p
                className={`text-sm font-semibold ${
                  status === "pending" ? "text-ink-400" : "text-ink-900"
                }`}
              >
                {STAGE_LABELS[stage]}
              </p>
              {entry ? (
                <>
                  <p className="text-xs text-ink-500">{entry.actor}</p>
                  <p className="mt-0.5 text-[11px] text-ink-400">
                    {new Date(entry.date).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.action}</p>
                </>
              ) : (
                <p className="text-xs text-ink-400">
                  {status === "current" ? "In progress" : "Pending"}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
