const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-background">
      {children}
    </div>
  );
};
export default AuthLayout;
