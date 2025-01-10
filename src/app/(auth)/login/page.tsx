"use client";

import Link from "next/link";
import FormInput from "@/app/components/Forminput";
import { Button } from "@/ui/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { loginSignup } from "@/actions/user";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      const res = await loginSignup(formData, true);

      if (res?.error) {
        toast({ title: res.error, variant: "destructive" });
      } else {
        toast({ title: "Login successful", variant: "default" });
        window.location.href = "/main"; // Redirect manually after login
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-row shadow-lg rounded-lg bg-white">
        {/* Image Section */}
        <div className="hidden md:flex items-center justify-center bg-gray-50 p-5 rounded-l-lg">
          <img
            src="https://account.asus.com/img/login_img02.png"
            alt="Login illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center gap-5 items-center py-10 px-5 w-[450px]">
          <h1 className="text-center font-bold text-4xl">Login</h1>
          <form action={handleSubmit} className="w-full">
            <FormInput
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
              required
            />
            <FormInput
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              required
            />
            <Button
              type="submit"
              className={`${
                loading ? "disable cursor-not-allowed" : ""
              } w-full bg-blue-500`}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
          {`Don't have an account?`}{" "}
          <Link
            href="/signup"
            className="text-center text-blue-800 cursor-pointer underline"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
