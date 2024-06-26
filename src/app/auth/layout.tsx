import LayoutBackgroundWrapper from '@/app/ui/LoyuatBackgroundWrapper/LayoutBackgroundWrapper';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutBackgroundWrapper mode="auth">{children}</LayoutBackgroundWrapper>
  );
}
