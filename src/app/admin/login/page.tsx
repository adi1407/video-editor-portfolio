import { AdminLoginForm } from "@/features/admin/components/admin-login-form";

export const metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <AdminLoginForm />
    </main>
  );
}
