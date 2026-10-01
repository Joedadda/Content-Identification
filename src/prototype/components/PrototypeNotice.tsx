import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export function PrototypeNotice({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="wa-notice"
          role="status"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 10 }}
          transition={{ duration: 0.32, ease }}
        >
          <div>
            <p className="wa-notice-title">Prototype preview</p>
            <p className="wa-notice-body">
              This interaction isn't functional yet. The examples above demonstrate how the assistant
              would respond to photos, videos and links.
            </p>
          </div>
          <button type="button" className="wa-notice-close" onClick={onClose}>
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
