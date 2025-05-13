import Image from "next/image";
import { Author } from "@/types/post";

interface AuthorCardProps {
  author?: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return <></>;
  return (
    <div className="flex flex-row sm:flex-row gap-6 items-start sm:items-center p-6 bg-purple-50 rounded-xl">
      <div className="flex-shrink-0">
        <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-md">
          <Image
            src={
              author.image || "/placeholder.svg?height=80&width=80&text=Author"
            }
            alt={author.name}
            fill
            sizes="auto"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <h3 className="text-lg font-bold text-purple-900 mb-1">
          {author.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">@InfoNesOz</p>
      </div>
    </div>
  );
}
