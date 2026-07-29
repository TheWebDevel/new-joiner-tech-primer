function MobileNotice() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-presidio-navy via-presidio-dark to-presidio-blue px-8 text-center lg:hidden">
      <img
        src={`${import.meta.env.BASE_URL}favicon.svg`}
        alt="Presidio"
        className="h-16 w-16 rounded-full shadow-lg"
      />
      <div>
        <p className="font-heading text-xl font-bold text-white">Best viewed on desktop</p>
        <p className="mt-2 text-sm text-white/70">
          This training app is designed for a larger screen. Please open it on a desktop or laptop.
        </p>
      </div>
    </div>
  )
}

export default MobileNotice
