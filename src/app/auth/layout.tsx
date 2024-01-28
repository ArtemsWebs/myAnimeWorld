import LayoutBackgroundWrapper from '@/app/_widget/LoyuatBackgroundWrapper/LayoutBackgroundWrapper';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutBackgroundWrapper mode="auth">{children}</LayoutBackgroundWrapper>
  );
}
