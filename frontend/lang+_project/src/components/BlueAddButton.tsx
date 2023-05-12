import "css-components/BlueAddButton.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function BlueAddButton(props: ButtonProps): React.ReactElement<ButtonProps> {
    const { children, ...rest } = props;
    return (
        <button className="blue-add-button" {...rest}>
            {children}
        </button>
    )
}