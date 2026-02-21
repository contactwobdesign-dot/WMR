export function PageGradient({ children }) {
  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary-50/50 via-primary-50/30 to-transparent -z-10" />
      {children}
    </div>
  )
}
