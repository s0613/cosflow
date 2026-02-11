"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FlaskConical, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f1729]">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1729] via-[#1a2744] to-[#0f1729]" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
        <CardHeader className="items-center text-center">
          {/* Logo */}
          <div className="mb-2 flex items-center justify-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <FlaskConical className="size-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            <span className="text-primary">COS</span>
            <span>FLOW</span>
          </CardTitle>
          <CardDescription className="text-white/50">
            화장품 규제 통합 관리 플랫폼
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70">
                <Mail className="size-3.5" />
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-primary focus-visible:ring-primary/30"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/70">
                <Lock className="size-3.5" />
                비밀번호
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  className="border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/30 focus-visible:border-primary focus-visible:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button type="submit" size="lg" className="w-full text-base font-semibold shadow-lg shadow-primary/25">
              로그인
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <button
            type="button"
            className="text-sm text-white/40 transition-colors hover:text-primary"
          >
            비밀번호를 잊으셨나요?
          </button>
        </CardFooter>
      </Card>

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-white/25">
        &copy; 2024 COSFLOW by UPFLOW. All rights reserved.
      </p>
    </div>
  );
}
