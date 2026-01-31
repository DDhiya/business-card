import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
}

export function QRCodeModal({ isOpen, onClose, url }: QRCodeModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 shadow-2xl text-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="mb-2 text-xl font-bold text-gray-900">Scan to Connect</h3>
                        <p className="mb-6 text-sm text-gray-500">
                            Point your camera at the QR code to visit this card.
                        </p>

                        <div className="flex justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-inner">
                            <QRCodeSVG
                                value={url}
                                size={200}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            />
                        </div>

                        <div className="mt-6 text-xs text-gray-400 break-all">
                            {url}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
