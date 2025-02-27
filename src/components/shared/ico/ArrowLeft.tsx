import { ReactComponent as ArrowLeftIcon } from "@assets/icons/arrow_left_24_24.svg"

const ArrowLeftIconComponent = ArrowLeftIcon as React.FC<
    React.SVGProps<SVGSVGElement>
>

const ArrowLeft = () => {
    return (
        <div>
            <ArrowLeftIconComponent width={24} height={24} />
        </div>
    )
}

export default ArrowLeft
