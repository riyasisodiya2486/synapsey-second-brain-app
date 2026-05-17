import { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "./config";
import bg1 from "../assets/bg4.jpg";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSignup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setStatus({ type: "error", message: "Please fill out all initialization fields." });
      return;
    }

    try {
      setIsLoading(true);
      setStatus(null);

      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

      setStatus({ type: "success", message: "Account created successfully. Redirecting..." });
      
      // Give the user a brief moment to see the success state before navigating
      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to establish node registration.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex bg-[#0B0C10] text-[#F5F5F7] font-sans overflow-hidden antialiased">
      
      {/* Media Canvas (Flipped to the left side to mirror the Signin flow layout symmetrically) */}
      <div className="hidden lg:block lg:w-[55%] h-full relative p-6 bg-[#0B0C10]">
        <div className="w-full h-full rounded-2xl overflow-hidden relative border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 bg-gradient-to-l from-[#0B0C10] via-transparent to-transparent z-10 pointer-events-none" />
          <img
            className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.02]"
            src={bg1}
            alt="Synapsey Visual Canvas"
          />
        </div>
      </div>

      {/* Interactive Form Panel */}
      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-8 sm:px-16 xl:px-24 bg-gradient-to-b from-[#0B0C10] via-[#111217] to-[#0B0C10]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto space-y-8"
        >
          {/* Typography Header - Left-aligned & minimal */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create an account
            </h1>
            <p className="text-sm font-light text-neutral-400">
              Start offloading your digital memory footprint today.
            </p>
          </div>

          {/* Form Interactive Core */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Input reference={usernameRef} placeholder="Choose a username" />
              <Input reference={passwordRef} placeholder="Create a secure password" />
            </div>

            {/* Micro-Interaction Status Intercept */}
            {status && (
              <motion.p
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs font-medium tracking-wide ${
                  status.type === "success" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {status.message}
              </motion.p>
            )}

            <Button
              onClick={handleSignup}
              variant="primary"
              text={isLoading ? "Creating account..." : "Register Node"}
              loading={isLoading}
              fullWidth={true}
              className="py-3"
            />
          </div>

          {/* Explicit Native Routing Alternatives */}
          <div className="pt-4 border-t border-white/[0.04]">
            <p className="text-xs text-neutral-500">
              Already using Synapsey?{" "}
              <Link
                to="/signin"
                className="text-neutral-300 font-semibold hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white"
              >
                Sign in to your dashboard
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}