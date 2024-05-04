const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex min-h-screen justify-center items-center">
        {children}
      </div>
    )
  }
  
  export default Layout