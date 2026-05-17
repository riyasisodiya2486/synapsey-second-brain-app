import { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "./config";
import bg2 from "../assets/bg2.jpg";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Interface states for a production-ready experience
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setErrorMessage("Please fill in all security fields.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Authentication dropped:", error);
      setErrorMessage(
        error.response?.data?.message || "Invalid credentials. Please verify your access node."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#0B0C10] text-[#F5F5F7] font-sans overflow-hidden antialiased">
      
      {/* Left Segment: Auth Panel */}
      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-8 sm:px-16 xl:px-24 relative z-10 bg-gradient-to-b from-[#0B0C10] via-[#111217] to-[#0B0C10]">
        
        {/* Subtle background glow element */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto space-y-8"
        >
          {/* Brand/Heading Stack */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
              Welcome to Synapsey
            </h1>
            <p className="text-sm font-light text-neutral-400 leading-relaxed">
              Unlock your second brain. Sync memory vectors, curate links, and let your digital mind answer flawlessly.
            </p>
          </div>

          {/* Form Interactive Fields Stack */}
          <div className="space-y-4">
            <div className="space-y-3.5">
              <Input reference={usernameRef} placeholder="Username or Email" />
              <Input reference={passwordRef} placeholder="Password" />
            </div>

            {/* Micro Error Feedback Intercept */}
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-medium text-rose-400/90 tracking-wide"
              >
                {errorMessage}
              </motion.p>
            )}

            <Button
              onClick={handleSignin}
              variant="primary"
              text={isLoading ? "Syncing Brain..." : "Sign In to Engine"}
              loading={isLoading}
              fullWidth={true}
              className="py-3 shadow-lg shadow-white/[0.01] hover:shadow-white/[0.04]"
            />
          </div>

          {/* Footer Router Navigation Redirection */}
          <div className="text-center pt-2 border-t border-white/[0.03]">
            <p className="text-xs text-neutral-500 tracking-wide">
              New to the platform?{" "}
              <Link 
                to="/signup" 
                className="text-neutral-200 font-semibold hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white"
              >
                Create an operational account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Segment: Cinematic Cinematic Media Canvas Frame */}
      <div className="hidden lg:block lg:w-[55%] h-full relative p-6 bg-[#0B0C10]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full rounded-2xl overflow-hidden relative border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Dark Glass Lighting Vignette Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10] via-transparent to-black/20 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/60 via-transparent to-transparent z-10 pointer-events-none" />
          
          <img
            className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.05] scale-100 hover:scale-105 transition-transform duration-[10000ms] ease-out"
            src={bg2}
            alt="Synapsey Digital Environment Backdrop"
          />
        </motion.div>
      </div>
    </div>
  );
}