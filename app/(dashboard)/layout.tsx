import Navbar from '../../components/ui/Navbar'
import Sidebar from '../../components/ui/Sidebar'

import { PropsWithChildren } from 'react'

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="grid lg:grid-cols-5">
      {/* first-col hide on small screen */}
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      {/* second-col hide dropdown on big screen */}
      <div className="lg:col-span-4">
        <Navbar />
        <div className="py-16 px-14 sm:px-8 lg:px-16">{children}</div>
      </div>
      {children}
    </main>
  )
}
export default layout
