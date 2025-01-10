"use client";
import { startTransition, useState } from "react";
import Link from "next/link";
import FormInput from "@/app/components/Forminput";
import { Button } from "@/ui/ui/button";
import { loginSignup } from "@/actions/user";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    startTransition(async () => {
      const res = await loginSignup(formData, false);

      if (res?.error) {
        // Check if res is defined before accessing its error property
        toast({ title: res.error, variant: "destructive" });
      } else {
        toast({ title: "Signup successful!", variant: "destructive" });
      }
      setLoading(false);
    });
  };

  return (
    <div className="grid place-content-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center gap-5 items-center py-10 w-[450px] shadow-lg rounded-lg bg-white">
        <h1 className="text-center font-bold text-4xl">Sign Up</h1>
        <form action={handleSubmit} className="w-full px-5">
          <FormInput
            name="name"
            type="text"
            placeholder="Enter your name"
            label="Full Name"
            required
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Enter your email"
            label="Email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address."
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
            required
            minLength={8}
            title="Password must be at least 8 characters long."
          />
          <Button
            type="submit"
            className={`${
              loading ? "disable cursor-not-allowed" : ""
            } w-full bg-blue-500`}
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
        <Link
          href="/login"
          className="text-center text-blue-800 cursor-pointer underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;

