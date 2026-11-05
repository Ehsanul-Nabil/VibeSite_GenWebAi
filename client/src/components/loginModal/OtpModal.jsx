// import React, { useState, useRef } from "react";
// import { X } from "lucide-react";

// const OtpModal = ({
//   email = "you@example.com",
//   isOpen = true,
//   onClose,
//   onVerify,
//   onResend,
//   onChangeEmail,
//   loading = false,
// }) => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputRefs = useRef([]);

//   if (!isOpen) return null;

//   const handleChange = (index, value) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input box
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").trim().slice(0, 6).split("");
//     if (pasteData.every((char) => /^[0-9]$/.test(char))) {
//       const newOtp = [...otp];
//       pasteData.forEach((char, i) => {
//         newOtp[i] = char;
//       });
//       setOtp(newOtp);
//       inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const code = otp.join("");
//     if (code.length === 6 && onVerify) {
//       onVerify(code);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
//       <div className="relative w-full max-w-md rounded-3xl bg-[#090b11] border border-slate-800/80 p-8 shadow-2xl text-center selection:bg-purple-500/30">
        
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute right-6 top-6 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
//           aria-label="Close"
//         >
//           <X size={20} />
//         </button>

//         {/* Header Title */}
//         <h2 className="text-2xl font-bold text-white tracking-tight mb-2 mt-2">
//           Verify Your Email
//         </h2>
//         <p className="text-sm text-slate-400 mb-8">
//           We sent a 6-digit code to{" "}
//           <span className="text-slate-200">{email}</span>
//         </p>

//         <form onSubmit={handleSubmit}>
//           {/* OTP Input Grid */}
//           <div
//             className="flex items-center justify-center gap-2.5 mb-8"
//             onPaste={handlePaste}
//           >
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 placeholder={digit ? "" : "-"}
//                 autoFocus={index === 0}
//                 className={`w-12 h-14 text-center text-xl font-medium rounded-xl transition-all duration-200 outline-none text-white ${
//                   digit
//                     ? "bg-[#0d121f] border-2 border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
//                     : "bg-[#111622] border border-slate-800/80 hover:border-slate-700 placeholder-slate-600 focus:border-purple-500/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
//                 }`}
//               />
//             ))}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading || otp.join("").length < 6}
//             className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold text-sm shadow-[0_0_20px_rgba(147,51,234,0.35)] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//           >
//             {loading ? "Verifying..." : "Verify & Continue"}
//           </button>
//         </form>

//         {/* Action Links */}
//         <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
//           <button
//             onClick={onResend}
//             className="underline underline-offset-4 hover:text-slate-200 transition-colors cursor-pointer"
//           >
//             Resend Code
//           </button>
//           <span>•</span>
//           <button
//             onClick={onChangeEmail}
//             className="underline underline-offset-4 hover:text-slate-200 transition-colors cursor-pointer"
//           >
//             Change Email
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default OtpModal;



import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const OtpModal = ({
  email = "you@example.com",
  isOpen = true,
  onClose,
  onVerify,
  onResend,
  onChangeEmail,
  loading = false,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const inputRefs = useRef([]);

  // Timer Effect
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().slice(0, 6).split("");
    if (pasteData.every((char) => /^[0-9]$/.test(char))) {
      const newOtp = [...otp];
      pasteData.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6 && onVerify) {
      onVerify(code);
    }
  };

  // Resend Handler: Calls parent onResend and resets timer to 5 minutes
  const handleResendClick = async () => {
    if (timeLeft > 0) return; // Prevent triggering if timer hasn't expired

    if (onResend) {
      await onResend();
    }
    setTimeLeft(300); // Reset timer to 5 minutes
    setOtp(["", "", "", "", "", ""]); // Reset OTP input fields
    inputRefs.current[0]?.focus(); // Refocus on first box
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-[#090b11] border border-slate-800/80 p-8 shadow-2xl text-center selection:bg-purple-500/30">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header Title */}
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2 mt-2">
          Verify Your Email
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          We sent a 6-digit code to{" "}
          <span className="text-slate-200">{email}</span>
        </p>

        {/* Timer Display */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111622] border border-slate-800 text-xs font-medium">
          <span className="text-slate-400">Code expires in:</span>
          <span className={`font-mono font-bold ${timeLeft < 60 ? "text-red-400" : "text-purple-400"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* OTP Input Grid */}
          <div
            className="flex items-center justify-center gap-2.5 mb-8"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                placeholder={digit ? "" : "-"}
                autoFocus={index === 0}
                className={`w-12 h-14 text-center text-xl font-medium rounded-xl transition-all duration-200 outline-none text-white ${
                  digit
                    ? "bg-[#0d121f] border-2 border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                    : "bg-[#111622] border border-slate-800/80 hover:border-slate-700 placeholder-slate-600 focus:border-purple-500/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                }`}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || otp.join("").length < 6 || timeLeft === 0}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold text-sm shadow-[0_0_20px_rgba(147,51,234,0.35)] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        {/* Action Links */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
          <button
            type="button"
            onClick={handleResendClick}
            disabled={timeLeft > 0}
            className={`underline underline-offset-4 transition-colors ${
              timeLeft > 0
                ? "text-slate-600 cursor-not-allowed no-underline"
                : "hover:text-slate-200 cursor-pointer text-purple-400"
            }`}
          >
            {timeLeft > 0 ? `Resend Code (${formatTime(timeLeft)})` : "Resend Code"}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onChangeEmail}
            className="underline underline-offset-4 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Change Email
          </button>
        </div>

      </div>
    </div>
  );
};

export default OtpModal;