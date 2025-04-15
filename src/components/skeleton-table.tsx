import { Skeleton } from "./ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="flex flex-col mt-8 ">
      <Skeleton className="w-full py-6 rounded-none" />
      <Skeleton className="w-full py-6 rounded-none border-t-[1px]" />
      <Skeleton className="w-full py-6 rounded-none border-t-[1px]" />
      <Skeleton className="w-full py-6 rounded-none border-t-[1px]" />
      <Skeleton className="w-full py-6 rounded-none border-t-[1px]" />
    </div>
  )
}