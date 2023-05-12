import addCircle from "data/images/add_circle_FILL1_wght700_GRAD0_opsz48.svg"

import "css-components/GrayAddButton.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function GrayAddButton(props: ButtonProps): React.ReactElement<ButtonProps> {
    const { children, ...rest } = props;
    return (
    <div className="add-new-something">
        <button className="add-new-something-button" {...rest}>
            <img src = { addCircle } alt = "Значок плюса для добавления"></img>
            { children }
        </button>
    </div>
    )
}