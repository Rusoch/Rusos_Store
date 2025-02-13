const RootLayout = ({children,}: Readonly<{children: React.ReactNode}>) => {
    return ( 
        <div className="flex h-screen flex-col"> Root
            <main className="main flex-1 wrapper">{children}</main>
        </div>
     );
}
 
export default RootLayout;