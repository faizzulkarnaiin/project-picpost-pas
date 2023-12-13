interface CommentCardProps {
  comment: string;
  avatar?: string | null;
  name: string;
  job?: string;
}

export default function CommentCard({
  name,
  comment,
  job,
  avatar,
}: CommentCardProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-white">
        <figure className="md:flex bg-current rounded-xl w-[280px] h-[350px] p-8 md:p-0  flex items-center justify-center flex-col">
          <img
            className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto bg-white"
            src={avatar ? avatar : ""}
            alt={name + " cover"}
            width="384"
            height="512"
          />
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
            <blockquote>
              <p className="text-lg font-medium text-white">{`“${comment}”`}</p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-sky-500 ">{name}</div>
              <div className="text-slate-70">{job}</div>
            </figcaption>
          </div>
        </figure>
      </div>
    </>
  );
}

{
  /* <figure classNameName="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
  <img classNameName="w-24 h-24 rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div classNameName="pt-6 text-center space-y-4">
    <blockquote>
      <p classNameName="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption classNameName="font-medium">
      <div classNameName="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div classNameName="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure> */
}
