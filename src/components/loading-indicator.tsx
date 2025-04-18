export function LoadingIndicator() {
  return (
    <div className="w-6 h-6 rounded-full border-2 border-white/30 bg-transparent relative before:w-[calc(100%+4px)] before:h-[calc(100%+4px)] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:rounded-full before:border-t-2 before:border-white animate-spin"></div>
  )
}