import { useBreakPoints } from '../../utils/UseBreakpoints'

type BgCardPPDb = "blue" | "white"

const CardPPDB = ({
  children,
  bg,
  title
}:
  {
    children: React.ReactNode
    bg: BgCardPPDb
    title: string
  }) => {
  const { xs } = useBreakPoints()

  return (
    <div className={`${bg == "white" ? "bg-[#eefeff] " : "bg-[#020731]"}   ${xs ? "w-[65%] p-[2rem] min-h-[450px] rounded-[20px]" : "flex-1  p-[1rem]"}`}>
      <div className="flex flex-col ">
        <div className={`${bg == 'white' ? "bg-[#020731]" : "bg-white"} h-[20vw] max-h-[4rem] flex items-center justify-center px-[4rem] rounded-full mx-auto`}>
          <span className={`${bg == 'white' ? "text-white" : "text-[#020731]"}  font-bold ${xs ? "text-[2.5vw]" : "text-[5vw]"}`}>
            {title}
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CardPPDB