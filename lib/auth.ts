"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://simsar.acwad.tech/public/api";

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { success: false, error: "بيانات الدخول غير صحيحة" };
    }

    const data = await res.json();

    // Set token in HTTP-only cookie
    cookies().set("admin_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "حدث خطأ أثناء الاتصال بالخادم" };
  }
}

export async function logout() {
  const token = cookies().get("admin_token")?.value;

  if (token) {
    try {
      await fetch(`${API_URL}/admin/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    } catch (e) {
      console.error("Logout Error:", e);
    }
  }

  cookies().delete("admin_token");
  return { success: true };
}

export async function getAdminToken() {
  return cookies().get("admin_token")?.value;
}
