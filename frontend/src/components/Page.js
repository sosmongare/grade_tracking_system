import React, { forwardRef } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

const Page = forwardRef(({ children, title = "", ...rest }, ref) => {
  return (
    <div ref={ref} {...rest}>
      <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      </HelmetProvider>
      {children}
    </div>
  )
})

export default Page
