interface centerTextProps {
    text : string;
    desc? : string
}
export default function CenterText({text, desc} : centerTextProps) {
  return (
    <>
    <div className="w-full mt-10 md:mt-16 mb-10  flex flex-col gap-3 justify-center items-center">
    <h4 className="font-semibold text-2xl md:text-4xl text-black">{text}</h4>
    <p className="text-gray-400 text-sm">{desc}</p>
    </div>
    </>
  )
}