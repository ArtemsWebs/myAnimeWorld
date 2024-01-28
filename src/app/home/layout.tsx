import LayoutBackgroundWrapper from '@/app/_widget/LoyuatBackgroundWrapper/LayoutBackgroundWrapper';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutBackgroundWrapper mode="home">{children}</LayoutBackgroundWrapper>
  );
}
