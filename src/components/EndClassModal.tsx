import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EndClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEndClass: () => void;
}

const EndClassModal: React.FC<EndClassModalProps> = ({
  isOpen,
  onClose,
  onEndClass,
}) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");

  const handleReasonChange = (reason: string) => {
    if (reason === "interrupted") {
      setSelectedReason(reason);
    } else if (
      [
        "noShow",
        "noInterest",
        "studentDisconnected",
        "teacherDisconnected",
        "other",
      ].includes(reason)
    ) {
      setSelectedReason(`interrupted-${reason}`);
    } else {
      setSelectedReason(reason);
    }
    if (reason !== "other") {
      setOtherReason("");
    }
  };

  const handleEndClass = () => {
    onEndClass();
    setSelectedReason(null);
    setOtherReason("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-2"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">
                Select a reason to end class
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 -mt-6 lg:-mt-0"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="reason"
                  value="completed"
                  checked={selectedReason === "completed"}
                  onChange={() => handleReasonChange("completed")}
                  className="form-radio"
                />
                <span className="text-black">Class completed</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="reason"
                  value="interrupted"
                  checked={selectedReason === "interrupted"}
                  onChange={() => handleReasonChange("interrupted")}
                  className="form-radio"
                />
                <span className="text-black">Class interrupted/aborted</span>
              </label>
              <AnimatePresence>
                {selectedReason?.startsWith("interrupted") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 space-y-2 overflow-hidden"
                  >
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interruptedReason"
                        value="noShow"
                        checked={selectedReason === "interrupted-noShow"}
                        onChange={() => handleReasonChange("noShow")}
                        className="form-radio"
                      />
                      <span className="text-black">
                        Students didn't show up for the class
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interruptedReason"
                        value="noInterest"
                        checked={selectedReason === "interrupted-noInterest"}
                        onChange={() => handleReasonChange("noInterest")}
                        className="form-radio"
                      />
                      <span className="text-black">
                        Students didn't show any interest
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interruptedReason"
                        value="studentDisconnected"
                        checked={
                          selectedReason === "interrupted-studentDisconnected"
                        }
                        onChange={() =>
                          handleReasonChange("studentDisconnected")
                        }
                        className="form-radio"
                      />
                      <span className="text-black">
                        Student got disconnected
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interruptedReason"
                        value="teacherDisconnected"
                        checked={
                          selectedReason === "interrupted-teacherDisconnected"
                        }
                        onChange={() =>
                          handleReasonChange("teacherDisconnected")
                        }
                        className="form-radio"
                      />
                      <span className="text-black">I got disconnected</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interruptedReason"
                        value="other"
                        checked={selectedReason === "interrupted-other"}
                        onChange={() => handleReasonChange("other")}
                        className="form-radio"
                      />
                      <span className="text-black">Other reason</span>
                    </label>
                    <AnimatePresence>
                      {selectedReason === "interrupted-other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <input
                            type="text"
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            placeholder="Please specify the reason"
                            className="w-full px-6 py-6 border rounded-md text-black"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEndClass}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                disabled={!selectedReason}
              >
                End Class
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EndClassModal;
