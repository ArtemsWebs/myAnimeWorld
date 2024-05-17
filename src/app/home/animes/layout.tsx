import LayoutBackgroundWrapper from '@/app/ui/LoyuatBackgroundWrapper/LayoutBackgroundWrapper';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutBackgroundWrapper mode="home">{children}</LayoutBackgroundWrapper>
  );
}
